!function(){var e,t,n=Backbone.Model.extend(),a=Backbone.Collection.extend({url:function(){return"/collection"}});module("Backbone.Model",{setup:function(){e=new n({id:"1-the-tempest",title:"The Tempest",author:"Bill Shakespeare",length:123}),t=new a,t.add(e)}}),test("initialize",3,function(){var e=Backbone.Model.extend({initialize:function(){this.one=1,equal(this.collection,t)}}),n=new e({},{collection:t});equal(n.one,1),equal(n.collection,t)}),test("initialize with attributes and options",1,function(){var e=Backbone.Model.extend({initialize:function(e,t){this.one=t.one}}),t=new e({},{one:1});equal(t.one,1)}),test("initialize with parsed attributes",1,function(){var e=Backbone.Model.extend({parse:function(e){return e.value+=1,e}}),t=new e({value:1},{parse:!0});equal(t.get("value"),2)}),test("initialize with defaults",2,function(){var e=Backbone.Model.extend({defaults:{first_name:"Unknown",last_name:"Unknown"}}),t=new e({first_name:"John"});equal(t.get("first_name"),"John"),equal(t.get("last_name"),"Unknown")}),test("parse can return null",1,function(){var e=Backbone.Model.extend({parse:function(e){return e.value+=1,null}}),t=new e({value:1},{parse:!0});equal(JSON.stringify(t.toJSON()),"{}")}),test("url",3,function(){e.urlRoot=null,equal(e.url(),"/collection/1-the-tempest"),e.collection.url="/collection/",equal(e.url(),"/collection/1-the-tempest"),e.collection=null,raises(function(){e.url()}),e.collection=t}),test("url when using urlRoot, and uri encoding",2,function(){var e=Backbone.Model.extend({urlRoot:"/collection"}),t=new e;equal(t.url(),"/collection"),t.set({id:"+1+"}),equal(t.url(),"/collection/%2B1%2B")}),test("url when using urlRoot as a function to determine urlRoot at runtime",2,function(){var e=Backbone.Model.extend({urlRoot:function(){return"/nested/"+this.get("parent_id")+"/collection"}}),t=new e({parent_id:1});equal(t.url(),"/nested/1/collection"),t.set({id:2}),equal(t.url(),"/nested/1/collection/2")}),test("underscore methods",5,function(){var e=new Backbone.Model({foo:"a",bar:"b",baz:"c"});e.clone();deepEqual(e.keys(),["foo","bar","baz"]),deepEqual(e.values(),["a","b","c"]),deepEqual(e.invert(),{a:"foo",b:"bar",c:"baz"}),deepEqual(e.pick("foo","baz"),{foo:"a",baz:"c"}),deepEqual(e.omit("foo","bar"),{baz:"c"})}),test("clone",10,function(){var e=new Backbone.Model({foo:1,bar:2,baz:3}),t=e.clone();equal(e.get("foo"),1),equal(e.get("bar"),2),equal(e.get("baz"),3),equal(t.get("foo"),e.get("foo"),"Foo should be the same on the clone."),equal(t.get("bar"),e.get("bar"),"Bar should be the same on the clone."),equal(t.get("baz"),e.get("baz"),"Baz should be the same on the clone."),e.set({foo:100}),equal(e.get("foo"),100),equal(t.get("foo"),1,"Changing a parent attribute does not change the clone.");var n=new Backbone.Model({p:1}),a=new Backbone.Model({p:2});a.set(n.clone().attributes,{unset:!0}),equal(n.get("p"),1),equal(a.get("p"),void 0)}),test("isNew",6,function(){var e=new Backbone.Model({foo:1,bar:2,baz:3});ok(e.isNew(),"it should be new"),e=new Backbone.Model({foo:1,bar:2,baz:3,id:-5}),ok(!e.isNew(),"any defined ID is legal, negative or positive"),e=new Backbone.Model({foo:1,bar:2,baz:3,id:0}),ok(!e.isNew(),"any defined ID is legal, including zero"),ok(new Backbone.Model({}).isNew(),"is true when there is no id"),ok(!new Backbone.Model({id:2}).isNew(),"is false for a positive integer"),ok(!new Backbone.Model({id:-5}).isNew(),"is false for a negative integer")}),test("get",2,function(){equal(e.get("title"),"The Tempest"),equal(e.get("author"),"Bill Shakespeare")}),test("escape",5,function(){equal(e.escape("title"),"The Tempest"),e.set({audience:"Bill & Bob"}),equal(e.escape("audience"),"Bill &amp; Bob"),e.set({audience:"Tim > Joan"}),equal(e.escape("audience"),"Tim &gt; Joan"),e.set({audience:10101}),equal(e.escape("audience"),"10101"),e.unset("audience"),equal(e.escape("audience"),"")}),test("has",10,function(){var e=new Backbone.Model;strictEqual(e.has("name"),!1),e.set({0:0,1:1,"true":!0,"false":!1,empty:"",name:"name","null":null,undefined:void 0}),strictEqual(e.has("0"),!0),strictEqual(e.has("1"),!0),strictEqual(e.has("true"),!0),strictEqual(e.has("false"),!0),strictEqual(e.has("empty"),!0),strictEqual(e.has("name"),!0),e.unset("name"),strictEqual(e.has("name"),!1),strictEqual(e.has("null"),!1),strictEqual(e.has("undefined"),!1)}),test("set and unset",8,function(){var e=new Backbone.Model({id:"id",foo:1,bar:2,baz:3}),t=0;e.on("change:foo",function(){t+=1}),e.set({foo:2}),ok(2==e.get("foo"),"Foo should have changed."),ok(1==t,"Change count should have incremented."),e.set({foo:2}),ok(2==e.get("foo"),"Foo should NOT have changed, still 2"),ok(1==t,"Change count should NOT have incremented."),e.validate=function(e){equal(e.foo,void 0,"validate:true passed while unsetting")},e.unset("foo",{validate:!0}),equal(e.get("foo"),void 0,"Foo should have changed"),delete e.validate,ok(2==t,"Change count should have incremented for unset."),e.unset("id"),equal(e.id,void 0,"Unsetting the id should remove the id property.")}),test("#2030 - set with failed validate, followed by another set triggers change",function(){var e=0,t=0,n=0,a=Backbone.Model.extend({validate:function(e){return e.x>1?(n++,"this is an error"):void 0}}),o=new a({x:0});o.on("change:x",function(){e++}),o.on("change",function(){t++}),o.set({x:2},{validate:!0}),o.set({x:1},{validate:!0}),deepEqual([e,t,n],[1,1,1])}),test("set triggers changes in the correct order",function(){var e=null,t=new Backbone.Model;t.on("last",function(){e="last"}),t.on("first",function(){e="first"}),t.trigger("first"),t.trigger("last"),equal(e,"last")}),test("set falsy values in the correct order",2,function(){var e=new Backbone.Model({result:"result"});e.on("change",function(){equal(e.changed.result,void 0),equal(e.previous("result"),!1)}),e.set({result:void 0},{silent:!0}),e.set({result:null},{silent:!0}),e.set({result:!1},{silent:!0}),e.set({result:void 0})}),test("multiple unsets",1,function(){var e=0,t=function(){e++},n=new Backbone.Model({a:1});n.on("change:a",t),n.set({a:2}),n.unset("a"),n.unset("a"),equal(e,2,"Unset does not fire an event for missing attributes.")}),test("unset and changedAttributes",1,function(){var e=new Backbone.Model({a:1});e.on("change",function(){ok("a"in e.changedAttributes(),"changedAttributes should contain unset properties")}),e.unset("a")}),test("using a non-default id attribute.",5,function(){var e=Backbone.Model.extend({idAttribute:"_id"}),t=new e({id:"eye-dee",_id:25,title:"Model"});equal(t.get("id"),"eye-dee"),equal(t.id,25),equal(t.isNew(),!1),t.unset("_id"),equal(t.id,void 0),equal(t.isNew(),!0)}),test("set an empty string",1,function(){var e=new Backbone.Model({name:"Model"});e.set({name:""}),equal(e.get("name"),"")}),test("setting an object",1,function(){var e=new Backbone.Model({custom:{foo:1}});e.on("change",function(){ok(1)}),e.set({custom:{foo:1}}),e.set({custom:{foo:2}})}),test("clear",3,function(){var e,t=new Backbone.Model({id:1,name:"Model"});t.on("change:name",function(){e=!0}),t.on("change",function(){var e=t.changedAttributes();ok("name"in e)}),t.clear(),equal(e,!0),equal(t.get("name"),void 0)}),test("defaults",4,function(){var e=Backbone.Model.extend({defaults:{one:1,two:2}}),t=new e({two:void 0});equal(t.get("one"),1),equal(t.get("two"),2),e=Backbone.Model.extend({defaults:function(){return{one:3,two:4}}}),t=new e({two:void 0}),equal(t.get("one"),3),equal(t.get("two"),4)}),test("change, hasChanged, changedAttributes, previous, previousAttributes",9,function(){var e=new Backbone.Model({name:"Tim",age:10});deepEqual(e.changedAttributes(),!1),e.on("change",function(){ok(e.hasChanged("name"),"name changed"),ok(!e.hasChanged("age"),"age did not"),ok(_.isEqual(e.changedAttributes(),{name:"Rob"}),"changedAttributes returns the changed attrs"),equal(e.previous("name"),"Tim"),ok(_.isEqual(e.previousAttributes(),{name:"Tim",age:10}),"previousAttributes is correct")}),equal(e.hasChanged(),!1),equal(e.hasChanged(void 0),!1),e.set({name:"Rob"}),equal(e.get("name"),"Rob")}),test("changedAttributes",3,function(){var e=new Backbone.Model({a:"a",b:"b"});deepEqual(e.changedAttributes(),!1),equal(e.changedAttributes({a:"a"}),!1),equal(e.changedAttributes({a:"b"}).a,"b")}),test("change with options",2,function(){var e,t=new Backbone.Model({name:"Rob"});t.on("change",function(t,n){e=n.prefix+t.get("name")}),t.set({name:"Bob"},{prefix:"Mr. "}),equal(e,"Mr. Bob"),t.set({name:"Sue"},{prefix:"Ms. "}),equal(e,"Ms. Sue")}),test("change after initialize",1,function(){var e=0,t={id:1,label:"c"},n=new Backbone.Model(t);n.on("change",function(){e+=1}),n.set(t),equal(e,0)}),test("save within change event",1,function(){var e=this,t=new Backbone.Model({firstName:"Taylor",lastName:"Swift"});t.url="/test",t.on("change",function(){t.save(),ok(_.isEqual(e.syncArgs.model,t))}),t.set({lastName:"Hicks"})}),test("validate after save",2,function(){var e,t=new Backbone.Model;t.validate=function(e){return e.admin?"Can't change admin status.":void 0},t.sync=function(e,t,n){n.success.call(this,{admin:!0})},t.on("invalid",function(t,n){e=n}),t.save(null),equal(e,"Can't change admin status."),equal(t.validationError,"Can't change admin status.")}),test("save",2,function(){e.save({title:"Henry V"}),equal(this.syncArgs.method,"update"),ok(_.isEqual(this.syncArgs.model,e))}),test("save, fetch, destroy triggers error event when an error occurs",3,function(){var e=new Backbone.Model;e.on("error",function(){ok(!0)}),e.sync=function(e,t,n){n.error()},e.save({data:2,id:1}),e.fetch(),e.destroy()}),test("save with PATCH",function(){e.clear().set({id:1,a:1,b:2,c:3,d:4}),e.save(),equal(this.syncArgs.method,"update"),equal(this.syncArgs.options.attrs,void 0),e.save({b:2,d:4},{patch:!0}),equal(this.syncArgs.method,"patch"),equal(_.size(this.syncArgs.options.attrs),2),equal(this.syncArgs.options.attrs.d,4),equal(this.syncArgs.options.attrs.a,void 0),equal(this.ajaxSettings.data,'{"b":2,"d":4}')}),test("save in positional style",1,function(){var e=new Backbone.Model;e.sync=function(e,t,n){n.success()},e.save("title","Twelfth Night"),equal(e.get("title"),"Twelfth Night")}),test("save with non-object success response",2,function(){var e=new Backbone.Model;e.sync=function(e,t,n){n.success("",n),n.success(null,n)},e.save({testing:"empty"},{success:function(e){deepEqual(e.attributes,{testing:"empty"})}})}),test("fetch",2,function(){e.fetch(),equal(this.syncArgs.method,"read"),ok(_.isEqual(this.syncArgs.model,e))}),test("destroy",3,function(){e.destroy(),equal(this.syncArgs.method,"delete"),ok(_.isEqual(this.syncArgs.model,e));var t=new Backbone.Model;equal(t.destroy(),!1)}),test("non-persisted destroy",1,function(){var e=new Backbone.Model({foo:1,bar:2,baz:3});e.sync=function(){throw"should not be called"},e.destroy(),ok(!0,"non-persisted model should not call sync")}),test("validate",function(){var e,t=new Backbone.Model;t.validate=function(e){return e.admin!=this.get("admin")?"Can't change admin status.":void 0},t.on("invalid",function(t,n){e=n});var n=t.set({a:100});equal(n,t),equal(t.get("a"),100),equal(e,void 0),n=t.set({admin:!0}),equal(t.get("admin"),!0),n=t.set({a:200,admin:!1},{validate:!0}),equal(e,"Can't change admin status."),equal(n,!1),equal(t.get("a"),100)}),test("validate on unset and clear",6,function(){var e,t=new Backbone.Model({name:"One"});t.validate=function(t){return t.name?void 0:(e=!0,"No thanks.")},t.set({name:"Two"}),equal(t.get("name"),"Two"),equal(e,void 0),t.unset("name",{validate:!0}),equal(e,!0),equal(t.get("name"),"Two"),t.clear({validate:!0}),equal(t.get("name"),"Two"),delete t.validate,t.clear(),equal(t.get("name"),void 0)}),test("validate with error callback",8,function(){var e,t=new Backbone.Model;t.validate=function(e){return e.admin?"Can't change admin status.":void 0},t.on("invalid",function(t,n){e=!0});var n=t.set({a:100},{validate:!0});equal(n,t),equal(t.get("a"),100),equal(t.validationError,null),equal(e,void 0),n=t.set({a:200,admin:!0},{validate:!0}),equal(n,!1),equal(t.get("a"),100),equal(t.validationError,"Can't change admin status."),equal(e,!0)}),test("defaults always extend attrs (#459)",2,function(){var e=Backbone.Model.extend({defaults:{one:1},initialize:function(e,t){equal(this.attributes.one,1)}});new e({}),new e}),test("Inherit class properties",6,function(){var e=Backbone.Model.extend({instancePropSame:function(){},instancePropDiff:function(){}},{classProp:function(){}}),t=e.extend({instancePropDiff:function(){}}),n=new e,a=new t;equal(t.classProp,e.classProp),notEqual(t.classProp,void 0),equal(a.instancePropSame,n.instancePropSame),notEqual(a.instancePropSame,void 0),notEqual(t.prototype.instancePropDiff,e.prototype.instancePropDiff),notEqual(t.prototype.instancePropDiff,void 0)}),test("Nested change events don't clobber previous attributes",4,function(){(new Backbone.Model).on("change:state",function(e,t){equal(e.previous("state"),void 0),equal(t,"hello"),e.set({other:"whatever"})}).on("change:state",function(e,t){equal(e.previous("state"),void 0),equal(t,"hello")}).set({state:"hello"})}),test("hasChanged/set should use same comparison",2,function(){var e=0,t=new Backbone.Model({a:null});t.on("change",function(){ok(this.hasChanged("a"))}).on("change:a",function(){e++}).set({a:void 0}),equal(e,1)}),test("#582, #425, change:attribute callbacks should fire after all changes have occurred",9,function(){var e=new Backbone.Model,t=function(){equal(e.get("a"),"a"),equal(e.get("b"),"b"),equal(e.get("c"),"c")};e.on("change:a",t),e.on("change:b",t),e.on("change:c",t),e.set({a:"a",b:"b",c:"c"})}),test("#871, set with attributes property",1,function(){var e=new Backbone.Model;e.set({attributes:!0}),ok(e.has("attributes"))}),test("set value regardless of equality/change",1,function(){var e=new Backbone.Model({x:[]}),t=[];e.set({x:t}),ok(e.get("x")===t)}),test("set same value does not trigger change",0,function(){var e=new Backbone.Model({x:1});e.on("change change:x",function(){ok(!1)}),e.set({x:1}),e.set({x:1})}),test("unset does not fire a change for undefined attributes",0,function(){var e=new Backbone.Model({x:void 0});e.on("change:x",function(){ok(!1)}),e.unset("x")}),test("set: undefined values",1,function(){var e=new Backbone.Model({x:void 0});ok("x"in e.attributes)}),test("hasChanged works outside of change events, and true within",6,function(){var e=new Backbone.Model({x:1});e.on("change:x",function(){ok(e.hasChanged("x")),equal(e.get("x"),1)}),e.set({x:2},{silent:!0}),ok(e.hasChanged()),equal(e.hasChanged("x"),!0),e.set({x:1}),ok(e.hasChanged()),equal(e.hasChanged("x"),!0)}),test("hasChanged gets cleared on the following set",4,function(){var e=new Backbone.Model;e.set({x:1}),ok(e.hasChanged()),e.set({x:1}),ok(!e.hasChanged()),e.set({x:2}),ok(e.hasChanged()),e.set({}),ok(!e.hasChanged())}),test("save with `wait` succeeds without `validate`",1,function(){var e=new Backbone.Model;e.url="/test",e.save({x:1},{wait:!0}),ok(this.syncArgs.model===e)}),test("save without `wait` doesn't set invalid attributes",function(){var e=new Backbone.Model;e.validate=function(){return 1},e.save({a:1}),equal(e.get("a"),void 0)}),test("save doesn't validate twice",function(){var e=new Backbone.Model,t=0;e.sync=function(){},e.validate=function(){++t},e.save({}),equal(t,1)}),test("`hasChanged` for falsey keys",2,function(){var e=new Backbone.Model;e.set({x:!0},{silent:!0}),ok(!e.hasChanged(0)),ok(!e.hasChanged(""))}),test("`previous` for falsey keys",2,function(){var e=new Backbone.Model({0:!0,"":!0});e.set({0:!1,"":!1},{silent:!0}),equal(e.previous(0),!0),equal(e.previous(""),!0)}),test("`save` with `wait` sends correct attributes",5,function(){var e=0,t=new Backbone.Model({x:1,y:2});t.url="/test",t.on("change:x",function(){e++}),t.save({x:3},{wait:!0}),deepEqual(JSON.parse(this.ajaxSettings.data),{x:3,y:2}),equal(t.get("x"),1),equal(e,0),this.syncArgs.options.success({}),equal(t.get("x"),3),equal(e,1)}),test("a failed `save` with `wait` doesn't leave attributes behind",1,function(){var e=new Backbone.Model;e.url="/test",e.save({x:1},{wait:!0}),equal(e.get("x"),void 0)}),test("#1030 - `save` with `wait` results in correct attributes if success is called during sync",2,function(){var e=new Backbone.Model({x:1,y:2});e.sync=function(e,t,n){n.success()},e.on("change:x",function(){ok(!0)}),e.save({x:3},{wait:!0}),equal(e.get("x"),3)}),test("save with wait validates attributes",function(){var e=new Backbone.Model;e.url="/test",e.validate=function(){ok(!0)},e.save({x:1},{wait:!0})}),test("save turns on parse flag",function(){var e=Backbone.Model.extend({sync:function(e,t,n){ok(n.parse)}});(new e).save()}),test("nested `set` during `'change:attr'`",2,function(){var e=[],t=new Backbone.Model;t.on("all",function(t){e.push(t)}),t.on("change",function(){t.set({z:!0},{silent:!0})}),t.on("change:x",function(){t.set({y:!0})}),t.set({x:!0}),deepEqual(e,["change:y","change:x","change"]),e=[],t.set({z:!0}),deepEqual(e,[])}),test("nested `change` only fires once",1,function(){var e=new Backbone.Model;e.on("change",function(){ok(!0),e.set({x:!0})}),e.set({x:!0})}),test("nested `set` during `'change'`",6,function(){var e=0,t=new Backbone.Model;t.on("change",function(){switch(e++){case 0:deepEqual(this.changedAttributes(),{x:!0}),equal(t.previous("x"),void 0),t.set({y:!0});break;case 1:deepEqual(this.changedAttributes(),{x:!0,y:!0}),equal(t.previous("x"),void 0),t.set({z:!0});break;case 2:deepEqual(this.changedAttributes(),{x:!0,y:!0,z:!0}),equal(t.previous("y"),void 0);break;default:ok(!1)}}),t.set({x:!0})}),test("nested `change` with silent",3,function(){var e=0,t=new Backbone.Model;t.on("change:y",function(){ok(!1)}),t.on("change",function(){switch(e++){case 0:deepEqual(this.changedAttributes(),{x:!0}),t.set({y:!0},{silent:!0}),t.set({z:!0});break;case 1:deepEqual(this.changedAttributes(),{x:!0,y:!0,z:!0});break;case 2:deepEqual(this.changedAttributes(),{z:!1});break;default:ok(!1)}}),t.set({x:!0}),t.set({z:!1})}),test("nested `change:attr` with silent",0,function(){var e=new Backbone.Model;e.on("change:y",function(){ok(!1)}),e.on("change",function(){e.set({y:!0},{silent:!0}),e.set({z:!0})}),e.set({x:!0})}),test("multiple nested changes with silent",1,function(){var e=new Backbone.Model;e.on("change:x",function(){e.set({y:1},{silent:!0}),e.set({y:2})}),e.on("change:y",function(e,t){equal(t,2)}),e.set({x:!0})}),test("multiple nested changes with silent",1,function(){var e=[],t=new Backbone.Model;t.on("change:b",function(t,n){e.push(n)}),t.on("change",function(){t.set({b:1})}),t.set({b:0}),deepEqual(e,[0,1])}),test("basic silent change semantics",1,function(){var e=new Backbone.Model;e.set({x:1}),e.on("change",function(){ok(!0)}),e.set({x:2},{silent:!0}),e.set({x:1})}),test("nested set multiple times",1,function(){var e=new Backbone.Model;e.on("change:b",function(){ok(!0)}),e.on("change:a",function(){e.set({b:!0}),e.set({b:!0})}),e.set({a:!0})}),test("#1122 - clear does not alter options.",1,function(){var e=new Backbone.Model,t={};e.clear(t),ok(!t.unset)}),test("#1122 - unset does not alter options.",1,function(){var e=new Backbone.Model,t={};e.unset("x",t),ok(!t.unset)}),test("#1355 - `options` is passed to success callbacks",3,function(){var e=new Backbone.Model,t={success:function(e,t,n){ok(n)}};e.sync=function(e,t,n){n.success()},e.save({id:1},t),e.fetch(t),e.destroy(t)}),test("#1412 - Trigger 'sync' event.",3,function(){var e=new Backbone.Model({id:1});e.sync=function(e,t,n){n.success()},e.on("sync",function(){ok(!0)}),e.fetch(),e.save(),e.destroy()}),test("#1365 - Destroy: New models execute success callback.",2,function(){(new Backbone.Model).on("sync",function(){ok(!1)}).on("destroy",function(){ok(!0)}).destroy({success:function(){ok(!0)}})}),test("#1433 - Save: An invalid model cannot be persisted.",1,function(){var e=new Backbone.Model;e.validate=function(){return"invalid"},e.sync=function(){ok(!1)},strictEqual(e.save(),!1)}),test("#1377 - Save without attrs triggers 'error'.",1,function(){var e=Backbone.Model.extend({url:"/test/",sync:function(e,t,n){n.success()},validate:function(){return"invalid"}}),t=new e({id:1});t.on("invalid",function(){ok(!0)}),t.save()}),test("#1545 - `undefined` can be passed to a model constructor without coersion",function(){var e=Backbone.Model.extend({defaults:{one:1},initialize:function(e,t){equal(e,void 0)}});new e,new e(void 0)}),asyncTest("#1478 - Model `save` does not trigger change on unchanged attributes",0,function(){var e=Backbone.Model.extend({sync:function(e,t,n){setTimeout(function(){n.success(),start()},0)}});new e({x:!0}).on("change:x",function(){ok(!1)}).save(null,{wait:!0})}),test("#1664 - Changing from one value, silently to another, back to original triggers a change.",1,function(){var e=new Backbone.Model({x:1});e.on("change:x",function(){ok(!0)}),e.set({x:2},{silent:!0}),e.set({x:3},{silent:!0}),e.set({x:1})}),test("#1664 - multiple silent changes nested inside a change event",2,function(){var e=[],t=new Backbone.Model;t.on("change",function(){t.set({a:"c"},{silent:!0}),t.set({b:2},{silent:!0}),t.unset("c",{silent:!0})}),t.on("change:a change:b change:c",function(t,n){e.push(n)}),t.set({a:"a",b:1,c:"item"}),deepEqual(e,["a",1,"item"]),deepEqual(t.attributes,{a:"c",b:2})}),test("#1791 - `attributes` is available for `parse`",function(){var e=Backbone.Model.extend({parse:function(){this.has("a")}});new e(null,{parse:!0});expect(0)}),test("silent changes in last `change` event back to original triggers change",2,function(){var e=[],t=new Backbone.Model;t.on("change:a change:b change:c",function(t,n){e.push(n)}),t.on("change",function(){t.set({a:"c"},{silent:!0})}),t.set({a:"a"}),deepEqual(e,["a"]),t.set({a:"a"}),deepEqual(e,["a","a"])}),test("#1943 change calculations should use _.isEqual",function(){var e=new Backbone.Model({a:{key:"value"}});e.set("a",{key:"value"},{silent:!0}),equal(e.changedAttributes(),!1)}),test("#1964 - final `change` event is always fired, regardless of interim changes",1,function(){var e=new Backbone.Model;e.on("change:property",function(){e.set("property","bar")}),e.on("change",function(){ok(!0)}),e.set("property","foo")}),test("isValid",function(){var e=new Backbone.Model({valid:!0});e.validate=function(e){return e.valid?void 0:"invalid"},equal(e.isValid(),!0),equal(e.set({valid:!1},{validate:!0}),!1),equal(e.isValid(),!0),e.set({valid:!1}),equal(e.isValid(),!1),ok(!e.set("valid",!1,{validate:!0}))}),test("#1179 - isValid returns true in the absence of validate.",1,function(){var e=new Backbone.Model;e.validate=null,ok(e.isValid())}),test("#1961 - Creating a model with {validate:true} will call validate and use the error callback",function(){var e=Backbone.Model.extend({validate:function(e){return 1===e.id?"This shouldn't happen":void 0}}),t=new e({id:1},{validate:!0});equal(t.validationError,"This shouldn't happen")}),test("toJSON receives attrs during save(..., {wait: true})",1,function(){var e=Backbone.Model.extend({url:"/test",toJSON:function(){return strictEqual(this.attributes.x,1),_.clone(this.attributes)}}),t=new e;t.save({x:1},{wait:!0})}),test("#2034 - nested set with silent only triggers one change",1,function(){var e=new Backbone.Model;e.on("change",function(){e.set({b:!0},{silent:!0}),ok(!0)}),e.set({a:!0})})}();