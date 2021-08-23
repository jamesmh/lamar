import{o as n,c as a,a as s,d as e,e as t}from"./app.213acb6a.js";const o='{"title":"The \\"Frame\\" Model","description":"","frontmatter":{},"headers":[{"level":2,"title":"GeneratedAssembly/Type/Method","slug":"generatedassembly-type-method"}],"relativePath":"guide/compilation/frames/index.md","lastUpdated":1629732345323}',l={},c=e("h1",{id:"the-frame-model"},[e("a",{class:"header-anchor",href:"#the-frame-model","aria-hidden":"true"},"#"),t(' The "Frame" Model')],-1),p=e("p",null,'The purpose of the "frames" model is to be able to generate dynamic methods by declaring a list of logical operations in generated code via Frame objects, then let Lamar handle:',-1),i=e("ul",null,[e("li",null,"Finding any missing dependencies of those frames"),e("li",null,"Determine what the necessary variable inputs are"),e("li",null,"Ordering all the frames based on dependency order just prior to generating the code")],-1),u=e("p",null,"Before diving into an example, here's a little class diagram of the main types:",-1),r=e("p",null,[e("img",{src:"/lamar/assets/LamarCodeGenClassDiagram.d1472101.png",alt:"The Code Generation Model"})],-1),k=e("p",null,"The various types represent:",-1),d=e("ul",null,[e("li",null,[e("code",null,"Frame"),t(" - Named after the StackFrame objects within stack traces in .NET. Models a logical action done in the generated code. Concrete examples in Lamar or Jasper would be calling a method on an object, calling a constructor function, or specific frame objects to create wrapped transaction boundaries or exception handling boundaries.")]),e("li",null,[e("code",null,"Variable"),t(" - pretty well what it sounds like. This type models a variable within the generated method, but also includes information about what Frame created it to help order the dependencies")]),e("li",null,[e("code",null,"IVariableSource"),t(' - mechanism to "find" or create variables. Examples in Lamar include resolving a service from an IoC container, passing along a method argument, or the example below that tells you the current time')]),e("li",null,[e("code",null,"IMethodVariables"),t(" - interface that is used by Frame classes to go find their necessary Variable dependencies.")])],-1),m=e("p",null,"Alright then, let's make this concrete. Let's say that we want to generate and use dynamic instances of this interface:",-1),h=e("p",null,[e("a",{id:"snippet-sample_isaysomething"})],-1),w=e("div",{class:"language-cs"},[e("pre",null,[e("code",null,[e("span",{class:"token keyword"},"public"),t(),e("span",{class:"token keyword"},"interface"),t(),e("span",{class:"token class-name"},"ISaySomething"),t("\n"),e("span",{class:"token punctuation"},"{"),t("\n    "),e("span",{class:"token return-type class-name"},[e("span",{class:"token keyword"},"void")]),t(),e("span",{class:"token function"},"Speak"),e("span",{class:"token punctuation"},"("),e("span",{class:"token punctuation"},")"),e("span",{class:"token punctuation"},";"),t("\n"),e("span",{class:"token punctuation"},"}"),t("\n")])])],-1),y=e("p",null,[e("sup",null,[e("a",{href:"https://github.com/JasperFx/lamar/blob/master/src/LamarCompiler.Testing/Samples/Frames.cs#L67-L72",title:"Snippet source file"},"snippet source"),t(" | "),e("a",{href:"#snippet-sample_isaysomething",title:"Start of snippet"},"anchor")]),s(" endSnippet ")],-1),f=e("p",null,[t("Moreover, I want a version of "),e("code",null,"ISaySomething"),t(" that will call the following method and write the current time to the console:")],-1),g=e("p",null,[e("a",{id:"snippet-sample_nowspeaker"})],-1),b=e("div",{class:"language-cs"},[e("pre",null,[e("code",null,[e("span",{class:"token keyword"},"public"),t(),e("span",{class:"token keyword"},"static"),t(),e("span",{class:"token keyword"},"class"),t(),e("span",{class:"token class-name"},"NowSpeaker"),t("\n"),e("span",{class:"token punctuation"},"{"),t("\n    "),e("span",{class:"token keyword"},"public"),t(),e("span",{class:"token keyword"},"static"),t(),e("span",{class:"token return-type class-name"},[e("span",{class:"token keyword"},"void")]),t(),e("span",{class:"token function"},"Speak"),e("span",{class:"token punctuation"},"("),e("span",{class:"token class-name"},"DateTime"),t(" now"),e("span",{class:"token punctuation"},")"),t("\n    "),e("span",{class:"token punctuation"},"{"),t("\n        Console"),e("span",{class:"token punctuation"},"."),e("span",{class:"token function"},"WriteLine"),e("span",{class:"token punctuation"},"("),t("now"),e("span",{class:"token punctuation"},"."),e("span",{class:"token function"},"ToString"),e("span",{class:"token punctuation"},"("),e("span",{class:"token string"},'"o"'),e("span",{class:"token punctuation"},")"),e("span",{class:"token punctuation"},")"),e("span",{class:"token punctuation"},";"),t("\n    "),e("span",{class:"token punctuation"},"}"),t("\n"),e("span",{class:"token punctuation"},"}"),t("\n")])])],-1),S=e("p",null,[e("sup",null,[e("a",{href:"https://github.com/JasperFx/lamar/blob/master/src/LamarCompiler.Testing/Samples/Frames.cs#L57-L65",title:"Snippet source file"},"snippet source"),t(" | "),e("a",{href:"#snippet-sample_nowspeaker",title:"Start of snippet"},"anchor")]),s(" endSnippet ")],-1),v=e("p",null,'Our dynamic class for ISaySomething will need to pass the current time to the now parameter of that method. To help out here, there\'s some built in helpers in Lamar specifically to write in the right code to get the current time to a variable of DateTime or DateTimeOffset that is named "now."',-1),T=e("p",null,"To skip ahead a little bit, let's generate a new class and object with the following code:",-1),F=e("p",null,[e("a",{id:"snippet-sample_write-new-method"})],-1),L=e("div",{class:"language-cs"},[e("pre",null,[e("code",null,[e("span",{class:"token comment"},"// Configures the code generation rules"),t("\n"),e("span",{class:"token comment"},"// and policies"),t("\n"),e("span",{class:"token class-name"},[e("span",{class:"token keyword"},"var")]),t(" rules "),e("span",{class:"token operator"},"="),t(),e("span",{class:"token keyword"},"new"),t(),e("span",{class:"token constructor-invocation class-name"},"GenerationRules"),e("span",{class:"token punctuation"},"("),e("span",{class:"token string"},'"GeneratedNamespace"'),e("span",{class:"token punctuation"},")"),e("span",{class:"token punctuation"},";"),t("\n\n"),e("span",{class:"token comment"},'// Adds the "now : DateTime" variable rule to '),t("\n"),e("span",{class:"token comment"},"// our generated code"),t("\nrules"),e("span",{class:"token punctuation"},"."),t("Sources"),e("span",{class:"token punctuation"},"."),e("span",{class:"token function"},"Add"),e("span",{class:"token punctuation"},"("),e("span",{class:"token keyword"},"new"),t(),e("span",{class:"token constructor-invocation class-name"},"NowTimeVariableSource"),e("span",{class:"token punctuation"},"("),e("span",{class:"token punctuation"},")"),e("span",{class:"token punctuation"},")"),e("span",{class:"token punctuation"},";"),t("\n\n"),e("span",{class:"token comment"},"// Start the definition for a new generated assembly"),t("\n"),e("span",{class:"token class-name"},[e("span",{class:"token keyword"},"var")]),t(" assembly "),e("span",{class:"token operator"},"="),t(),e("span",{class:"token keyword"},"new"),t(),e("span",{class:"token constructor-invocation class-name"},"GeneratedAssembly"),e("span",{class:"token punctuation"},"("),t("rules"),e("span",{class:"token punctuation"},")"),e("span",{class:"token punctuation"},";"),t("\n\n"),e("span",{class:"token comment"},'// Add a new generated type called "WhatTimeIsIt" that will'),t("\n"),e("span",{class:"token comment"},"// implement the "),t("\n"),e("span",{class:"token class-name"},[e("span",{class:"token keyword"},"var")]),t(" type "),e("span",{class:"token operator"},"="),t(" assembly"),e("span",{class:"token punctuation"},"."),e("span",{class:"token function"},"AddType"),e("span",{class:"token punctuation"},"("),e("span",{class:"token string"},'"WhatTimeIsIt"'),e("span",{class:"token punctuation"},","),t(),e("span",{class:"token keyword"},"typeof"),e("span",{class:"token punctuation"},"("),e("span",{class:"token type-expression class-name"},"ISaySomething"),e("span",{class:"token punctuation"},")"),e("span",{class:"token punctuation"},")"),e("span",{class:"token punctuation"},";"),t("\n\n"),e("span",{class:"token comment"},'// Getting the definition for the method named "Speak"'),t("\n"),e("span",{class:"token class-name"},[e("span",{class:"token keyword"},"var")]),t(" method "),e("span",{class:"token operator"},"="),t(" type"),e("span",{class:"token punctuation"},"."),e("span",{class:"token function"},"MethodFor"),e("span",{class:"token punctuation"},"("),e("span",{class:"token keyword"},"nameof"),e("span",{class:"token punctuation"},"("),t("ISaySomething"),e("span",{class:"token punctuation"},"."),t("Speak"),e("span",{class:"token punctuation"},")"),e("span",{class:"token punctuation"},")"),e("span",{class:"token punctuation"},";"),t("\n\n"),e("span",{class:"token comment"},"// Adding a frame that calls the NowSpeaker.Speak() method and"),t("\n"),e("span",{class:"token comment"},"// adding it to the generated method"),t("\n"),e("span",{class:"token class-name"},[e("span",{class:"token keyword"},"var")]),t(" @call "),e("span",{class:"token operator"},"="),t(),e("span",{class:"token keyword"},"new"),t(),e("span",{class:"token constructor-invocation class-name"},"MethodCall"),e("span",{class:"token punctuation"},"("),e("span",{class:"token keyword"},"typeof"),e("span",{class:"token punctuation"},"("),e("span",{class:"token type-expression class-name"},"NowSpeaker"),e("span",{class:"token punctuation"},")"),e("span",{class:"token punctuation"},","),t(),e("span",{class:"token keyword"},"nameof"),e("span",{class:"token punctuation"},"("),t("NowSpeaker"),e("span",{class:"token punctuation"},"."),t("Speak"),e("span",{class:"token punctuation"},")"),e("span",{class:"token punctuation"},")"),e("span",{class:"token punctuation"},";"),t("\nmethod"),e("span",{class:"token punctuation"},"."),t("Frames"),e("span",{class:"token punctuation"},"."),e("span",{class:"token function"},"Add"),e("span",{class:"token punctuation"},"("),t("@call"),e("span",{class:"token punctuation"},")"),e("span",{class:"token punctuation"},";"),t("\n\n"),e("span",{class:"token comment"},"// Compile the new code!"),t("\nassembly"),e("span",{class:"token punctuation"},"."),e("span",{class:"token function"},"CompileAll"),e("span",{class:"token punctuation"},"("),e("span",{class:"token punctuation"},")"),e("span",{class:"token punctuation"},";"),t("\n")])])],-1),x=e("p",null,[e("sup",null,[e("a",{href:"https://github.com/JasperFx/lamar/blob/master/src/LamarCompiler.Testing/Samples/Frames.cs#L23-L49",title:"Snippet source file"},"snippet source"),t(" | "),e("a",{href:"#snippet-sample_write-new-method",title:"Start of snippet"},"anchor")]),s(" endSnippet ")],-1),N=e("p",null,"After all that, if we interrogate the source code for the generated type above (type.SourceCode), we'd see this ugly generated code:",-1),C=e("div",{class:"language-csharp"},[e("pre",null,[e("code",null,[t("    "),e("span",{class:"token keyword"},"public"),t(),e("span",{class:"token keyword"},"class"),t(),e("span",{class:"token class-name"},"WhatTimeIsIt"),t(),e("span",{class:"token punctuation"},":"),t(),e("span",{class:"token type-list"},[e("span",{class:"token class-name"},[t("Lamar"),e("span",{class:"token punctuation"},"."),t("Testing"),e("span",{class:"token punctuation"},"."),t("Samples"),e("span",{class:"token punctuation"},"."),t("ISaySomething")])]),t("\n    "),e("span",{class:"token punctuation"},"{"),t("\n\n\n        "),e("span",{class:"token keyword"},"public"),t(),e("span",{class:"token return-type class-name"},[e("span",{class:"token keyword"},"void")]),t(),e("span",{class:"token function"},"Speak"),e("span",{class:"token punctuation"},"("),e("span",{class:"token punctuation"},")"),t("\n        "),e("span",{class:"token punctuation"},"{"),t("\n            "),e("span",{class:"token class-name"},[e("span",{class:"token keyword"},"var")]),t(" now "),e("span",{class:"token operator"},"="),t(" System"),e("span",{class:"token punctuation"},"."),t("DateTime"),e("span",{class:"token punctuation"},"."),t("UtcNow"),e("span",{class:"token punctuation"},";"),t("\n            Lamar"),e("span",{class:"token punctuation"},"."),t("Testing"),e("span",{class:"token punctuation"},"."),t("Samples"),e("span",{class:"token punctuation"},"."),t("NowSpeaker"),e("span",{class:"token punctuation"},"."),e("span",{class:"token function"},"Speak"),e("span",{class:"token punctuation"},"("),t("now"),e("span",{class:"token punctuation"},")"),e("span",{class:"token punctuation"},";"),t("\n        "),e("span",{class:"token punctuation"},"}"),t("\n\n    "),e("span",{class:"token punctuation"},"}"),t("\n")])])],-1),I=e("p",null,"Some notes about the generated code:",-1),V=e("ul",null,[e("li",null,"Lamar was able to stick in some additional code to pass the current time into a new variable, and call the Speak(DateTime now) method with that value."),e("li",null,"Lamar is smart enough to put that code before the call to the method (that kind of matters here)"),e("li",null,"The generated code uses full type names in almost all cases to avoid type collisions rather than trying to get smart with using statements in the generated code")],-1),G=e("p",null,"So now let's look at how Lamar was able to add the code to pass along DateTime.UtcNow. First off, let's look at the code that just writes out the date variable:",-1),D=e("p",null,[e("a",{id:"snippet-sample_nowfetchframe"})],-1),M=e("div",{class:"language-cs"},[e("pre",null,[e("code",null,[e("span",{class:"token keyword"},"public"),t(),e("span",{class:"token keyword"},"class"),t(),e("span",{class:"token class-name"},"NowFetchFrame"),t(),e("span",{class:"token punctuation"},":"),t(),e("span",{class:"token type-list"},[e("span",{class:"token class-name"},"SyncFrame")]),t("\n"),e("span",{class:"token punctuation"},"{"),t("\n    "),e("span",{class:"token keyword"},"public"),t(),e("span",{class:"token function"},"NowFetchFrame"),e("span",{class:"token punctuation"},"("),e("span",{class:"token class-name"},"Type"),t(" variableType"),e("span",{class:"token punctuation"},")"),t("\n    "),e("span",{class:"token punctuation"},"{"),t("\n        "),e("span",{class:"token comment"},'// Notice how "this" frame is passed into the variable'),t("\n        "),e("span",{class:"token comment"},"// class constructor as the creator"),t("\n        Variable "),e("span",{class:"token operator"},"="),t(),e("span",{class:"token keyword"},"new"),t(),e("span",{class:"token constructor-invocation class-name"},"Variable"),e("span",{class:"token punctuation"},"("),t("variableType"),e("span",{class:"token punctuation"},","),t(),e("span",{class:"token string"},'"now"'),e("span",{class:"token punctuation"},","),t(),e("span",{class:"token keyword"},"this"),e("span",{class:"token punctuation"},")"),e("span",{class:"token punctuation"},";"),t("\n    "),e("span",{class:"token punctuation"},"}"),t("\n    \n    "),e("span",{class:"token keyword"},"public"),t(),e("span",{class:"token return-type class-name"},"Variable"),t(" Variable "),e("span",{class:"token punctuation"},"{"),t(),e("span",{class:"token keyword"},"get"),e("span",{class:"token punctuation"},";"),t(),e("span",{class:"token punctuation"},"}"),t("\n    \n    "),e("span",{class:"token keyword"},"public"),t(),e("span",{class:"token keyword"},"override"),t(),e("span",{class:"token return-type class-name"},[e("span",{class:"token keyword"},"void")]),t(),e("span",{class:"token function"},"GenerateCode"),e("span",{class:"token punctuation"},"("),e("span",{class:"token class-name"},"GeneratedMethod"),t(" method"),e("span",{class:"token punctuation"},","),t(),e("span",{class:"token class-name"},"ISourceWriter"),t(" writer"),e("span",{class:"token punctuation"},")"),t("\n    "),e("span",{class:"token punctuation"},"{"),t("\n        writer"),e("span",{class:"token punctuation"},"."),e("span",{class:"token function"},"WriteLine"),e("span",{class:"token punctuation"},"("),e("span",{class:"token interpolation-string"},[e("span",{class:"token string"},'$"var '),e("span",{class:"token interpolation"},[e("span",{class:"token punctuation"},"{"),e("span",{class:"token expression language-csharp"},[t("Variable"),e("span",{class:"token punctuation"},"."),t("Usage")]),e("span",{class:"token punctuation"},"}")]),e("span",{class:"token string"}," = "),e("span",{class:"token interpolation"},[e("span",{class:"token punctuation"},"{"),e("span",{class:"token expression language-csharp"},[t("Variable"),e("span",{class:"token punctuation"},"."),t("VariableType"),e("span",{class:"token punctuation"},"."),t("FullName")]),e("span",{class:"token punctuation"},"}")]),e("span",{class:"token string"},"."),e("span",{class:"token interpolation"},[e("span",{class:"token punctuation"},"{"),e("span",{class:"token expression language-csharp"},[e("span",{class:"token keyword"},"nameof"),e("span",{class:"token punctuation"},"("),t("DateTime"),e("span",{class:"token punctuation"},"."),t("UtcNow"),e("span",{class:"token punctuation"},")")]),e("span",{class:"token punctuation"},"}")]),e("span",{class:"token string"},';"')]),e("span",{class:"token punctuation"},")"),e("span",{class:"token punctuation"},";"),t("\n        Next"),e("span",{class:"token punctuation"},"?."),e("span",{class:"token function"},"GenerateCode"),e("span",{class:"token punctuation"},"("),t("method"),e("span",{class:"token punctuation"},","),t(" writer"),e("span",{class:"token punctuation"},")"),e("span",{class:"token punctuation"},";"),t("\n    "),e("span",{class:"token punctuation"},"}"),t("\n"),e("span",{class:"token punctuation"},"}"),t("\n")])])],-1),A=e("p",null,[e("sup",null,[e("a",{href:"https://github.com/JasperFx/lamar/blob/master/src/LamarCodeGeneration/Model/NowTimeVariableSource.cs#L31-L49",title:"Snippet source file"},"snippet source"),t(" | "),e("a",{href:"#snippet-sample_nowfetchframe",title:"Start of snippet"},"anchor")]),s(" endSnippet ")],-1),_=e("p",null,[t("In the frame above, you'll see that the "),e("code",null,"GenerateCode()"),t(" method writes its code into the source, then immediately turns around and tells the next Frame - if there is one - to generated its code. As the last step to write out the new source code, Lamar:")],-1),O=e("ol",null,[e("li",null,"Goes through an effort to find any missing frames and variables"),e("li",null,"Sorts them with a topological sort (what frames depend on what other frames or variables, what variables are used or created by what frames)"),e("li",null,"Organizes the frames into a single linked list"),e("li",null,[t("Calls "),e("code",null,"GenerateCode()"),t(" on the first frame")])],-1),j=e("p",null,[t("In the generated method up above, the call to "),e("code",null,"NowSpeaker.Speak(now)"),t(" depends on the now variable which is in turn created by the "),e("code",null,"NowFetchFrame"),t(", and that's enough information for Lamar to order things and generate the final code.")],-1),J=e("p",null,[t("Lastly, we had to use a custom "),e("code",null,"IVariableSource"),t(" to teach Lamar how to resolve the now variable. That code looks like this:")],-1),W=e("p",null,[e("a",{id:"snippet-sample_nowtimevariablesource"})],-1),U=e("div",{class:"language-cs"},[e("pre",null,[e("code",null,[e("span",{class:"token keyword"},"public"),t(),e("span",{class:"token keyword"},"class"),t(),e("span",{class:"token class-name"},"NowTimeVariableSource"),t(),e("span",{class:"token punctuation"},":"),t(),e("span",{class:"token type-list"},[e("span",{class:"token class-name"},"IVariableSource")]),t("\n"),e("span",{class:"token punctuation"},"{"),t("\n    "),e("span",{class:"token keyword"},"public"),t(),e("span",{class:"token return-type class-name"},[e("span",{class:"token keyword"},"bool")]),t(),e("span",{class:"token function"},"Matches"),e("span",{class:"token punctuation"},"("),e("span",{class:"token class-name"},"Type"),t(" type"),e("span",{class:"token punctuation"},")"),t("\n    "),e("span",{class:"token punctuation"},"{"),t("\n        "),e("span",{class:"token keyword"},"return"),t(" type "),e("span",{class:"token operator"},"=="),t(),e("span",{class:"token keyword"},"typeof"),e("span",{class:"token punctuation"},"("),e("span",{class:"token type-expression class-name"},"DateTime"),e("span",{class:"token punctuation"},")"),t(),e("span",{class:"token operator"},"||"),t(" type "),e("span",{class:"token operator"},"=="),t(),e("span",{class:"token keyword"},"typeof"),e("span",{class:"token punctuation"},"("),e("span",{class:"token type-expression class-name"},"DateTimeOffset"),e("span",{class:"token punctuation"},")"),e("span",{class:"token punctuation"},";"),t("\n    "),e("span",{class:"token punctuation"},"}"),t("\n\n    "),e("span",{class:"token keyword"},"public"),t(),e("span",{class:"token return-type class-name"},"Variable"),t(),e("span",{class:"token function"},"Create"),e("span",{class:"token punctuation"},"("),e("span",{class:"token class-name"},"Type"),t(" type"),e("span",{class:"token punctuation"},")"),t("\n    "),e("span",{class:"token punctuation"},"{"),t("\n        "),e("span",{class:"token keyword"},"if"),t(),e("span",{class:"token punctuation"},"("),t("type "),e("span",{class:"token operator"},"=="),t(),e("span",{class:"token keyword"},"typeof"),e("span",{class:"token punctuation"},"("),e("span",{class:"token type-expression class-name"},"DateTime"),e("span",{class:"token punctuation"},")"),e("span",{class:"token punctuation"},")"),t("\n        "),e("span",{class:"token punctuation"},"{"),t("\n            "),e("span",{class:"token keyword"},"return"),t(),e("span",{class:"token keyword"},"new"),t(),e("span",{class:"token constructor-invocation class-name"},"NowFetchFrame"),e("span",{class:"token punctuation"},"("),e("span",{class:"token keyword"},"typeof"),e("span",{class:"token punctuation"},"("),e("span",{class:"token type-expression class-name"},"DateTime"),e("span",{class:"token punctuation"},")"),e("span",{class:"token punctuation"},")"),e("span",{class:"token punctuation"},"."),t("Variable"),e("span",{class:"token punctuation"},";"),t("\n        "),e("span",{class:"token punctuation"},"}"),t("\n\n        "),e("span",{class:"token keyword"},"if"),t(),e("span",{class:"token punctuation"},"("),t("type "),e("span",{class:"token operator"},"=="),t(),e("span",{class:"token keyword"},"typeof"),e("span",{class:"token punctuation"},"("),e("span",{class:"token type-expression class-name"},"DateTimeOffset"),e("span",{class:"token punctuation"},")"),e("span",{class:"token punctuation"},")"),t("\n        "),e("span",{class:"token punctuation"},"{"),t("\n            "),e("span",{class:"token keyword"},"return"),t(),e("span",{class:"token keyword"},"new"),t(),e("span",{class:"token constructor-invocation class-name"},"NowFetchFrame"),e("span",{class:"token punctuation"},"("),e("span",{class:"token keyword"},"typeof"),e("span",{class:"token punctuation"},"("),e("span",{class:"token type-expression class-name"},"DateTimeOffset"),e("span",{class:"token punctuation"},")"),e("span",{class:"token punctuation"},")"),e("span",{class:"token punctuation"},"."),t("Variable"),e("span",{class:"token punctuation"},";"),t("\n        "),e("span",{class:"token punctuation"},"}"),t("\n\n        "),e("span",{class:"token keyword"},"throw"),t(),e("span",{class:"token keyword"},"new"),t(),e("span",{class:"token constructor-invocation class-name"},"ArgumentOutOfRangeException"),e("span",{class:"token punctuation"},"("),e("span",{class:"token keyword"},"nameof"),e("span",{class:"token punctuation"},"("),t("type"),e("span",{class:"token punctuation"},")"),e("span",{class:"token punctuation"},","),t(),e("span",{class:"token string"},'"Only DateTime and DateTimeOffset are supported"'),e("span",{class:"token punctuation"},")"),e("span",{class:"token punctuation"},";"),t("\n    "),e("span",{class:"token punctuation"},"}"),t("\n"),e("span",{class:"token punctuation"},"}"),t("\n")])])],-1),R=e("p",null,[e("sup",null,[e("a",{href:"https://github.com/JasperFx/lamar/blob/master/src/LamarCodeGeneration/Model/NowTimeVariableSource.cs#L6-L29",title:"Snippet source file"},"snippet source"),t(" | "),e("a",{href:"#snippet-sample_nowtimevariablesource",title:"Start of snippet"},"anchor")]),s(" endSnippet ")],-1),E=e("p",null,[t("Out of the box, the Lamar + "),e("a",{href:"https://jasperfx.github.io",target:"_blank",rel:"noopener noreferrer"},"Jasper"),t(" combination uses variable sources for:")],-1),q=e("ul",null,[e("li",null,"Services from the internal IoC container of the application"),e("li",null,"Method arguments"),e("li",null,[t("Variables that can be derived from a method argument like "),e("code",null,"HttpContext.Request : HttpRequest")]),e("li",null,'The "now" convention shown here')],-1),H=e("h2",{id:"generatedassembly-type-method"},[e("a",{class:"header-anchor",href:"#generatedassembly-type-method","aria-hidden":"true"},"#"),t(" GeneratedAssembly/Type/Method")],-1),z=e("p",null,'Getting a little deeper into the parts of the "frames" model, see this class diagram:',-1),B=e("p",null,[e("img",{src:"/lamar/assets/GeneratedAssemblyModel.5c66e4ae.png",alt:"GeneratedAssembly Model"})],-1);l.render=function(e,t,o,l,P,$){return n(),a("div",null,[c,p,i,u,r,k,d,m,s(" snippet: sample_ISaySomething "),h,w,y,f,s(" snippet: sample_NowSpeaker "),g,b,S,v,T,s(" snippet: sample_write-new-method "),F,L,x,N,C,I,V,G,s(" snippet: sample_NowFetchFrame "),D,M,A,_,O,j,J,s(" snippet: sample_NowTimeVariableSource "),W,U,R,E,q,H,z,B])};export{o as __pageData,l as default};
