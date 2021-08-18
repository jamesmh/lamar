import{o as n,c as a,a as s,d as t,e,b as p}from"./app.80913d4a.js";const o='{"title":"Bootstrapping a Container","description":"","frontmatter":{},"relativePath":"guide/ioc/bootstrapping.md","lastUpdated":1629293317943}',c={},i=t("h1",{id:"bootstrapping-a-container"},[t("a",{class:"header-anchor",href:"#bootstrapping-a-container","aria-hidden":"true"},"#"),e(" Bootstrapping a Container")],-1),r=t("p",null,[e("To configure and bootstrap a Lamar container, you have a couple options. You can create a "),t("code",null,"Container"),e(" object with inline registrations:")],-1),l=p('<p><a id="snippet-sample_bootstrap-inline"></a></p><div class="language-cs"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> container <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Container</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span>\n<span class="token punctuation">{</span>\n    x<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">AddTransient</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IClock<span class="token punctuation">,</span> Clock<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar.Testing/Samples/Bootstrapping.cs#L18-L23" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_bootstrap-inline" title="Start of snippet">anchor</a></sup>\x3c!-- endSnippet --\x3e</p><p>Or pass in a configured <code>ServiceRegistry</code> object as shown below:</p>',4),u=p('<p><a id="snippet-sample_bootstrap-with-registry"></a></p><div class="language-cs"><pre><code><span class="token comment">// Create a Lamar.ServiceRegistry object</span>\n<span class="token comment">// and define your service registrations</span>\n<span class="token class-name"><span class="token keyword">var</span></span> registry <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ServiceRegistry</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// Use ASP.Net Core style registrations</span>\n<span class="token comment">// for basic functionality</span>\nregistry<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">AddSingleton</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IClock<span class="token punctuation">,</span> Clock<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nregistry<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">AddTransient</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IWidget<span class="token punctuation">,</span> RedWidget<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// Or use StructureMap style registration syntax</span>\n<span class="token comment">// as an alternative or to use more advanced usage</span>\nregistry<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IClockFactory<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Use</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>ClockFactory<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n\n<span class="token class-name"><span class="token keyword">var</span></span> container <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Container</span><span class="token punctuation">(</span>registry<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar.Testing/Samples/Bootstrapping.cs#L32-L50" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_bootstrap-with-registry" title="Start of snippet">anchor</a></sup>\x3c!-- endSnippet --\x3e</p><p>Lamar&#39;s <code>ServiceRegistry</code> supports a subset of StructureMap&#39;s old <code>Registry</code> class and should be used as a replacement when replacing StructureMap with Lamar. We renamed the class to disambiguate the name from the many other <code>Registry</code> classes in the CLR. <code>ServiceRegistry</code> implements the <a href="https://docs.microsoft.com/en-us/dotnet/api/microsoft.extensions.dependencyinjection.iservicecollection?view=aspnetcore-2.0" target="_blank" rel="noopener noreferrer">IServiceCollection</a> interface from <a href="http://ASP.Net" target="_blank" rel="noopener noreferrer">ASP.Net</a> Core. You can also create a Lamar container by passing in an instance of <code>IServiceCollection</code> like you&#39;d get within an <a href="http://ASP.Net" target="_blank" rel="noopener noreferrer">ASP.Net</a> Core application.</p>',4);c.render=function(t,e,p,o,c,k){return n(),a("div",null,[i,r,s(" snippet: sample_bootstrap-inline "),l,s(" snippet: sample_bootstrap-with-registry "),u])};export{o as __pageData,c as default};
