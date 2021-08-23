import{o as n,c as s,a,d as t,e as p,b as e}from"./app.213acb6a.js";const o='{"title":"Lamar and IDisposable","description":"","frontmatter":{},"headers":[{"level":2,"title":"Singletons","slug":"singletons"},{"level":2,"title":"Nested Containers","slug":"nested-containers"},{"level":2,"title":"Transients","slug":"transients"}],"relativePath":"guide/ioc/disposing.md","lastUpdated":1629732345330}',c={},l=t("h1",{id:"lamar-and-idisposable"},[t("a",{class:"header-anchor",href:"#lamar-and-idisposable","aria-hidden":"true"},"#"),p(" Lamar and IDisposable")],-1),u=t("p",null,"One of the main reasons to use an IoC container is to offload the work of disposing created objects at the right time in the application scope. Sure, it's something you should be aware of, but developers are less likely to make mistakes if that's just handled for them.",-1),i=t("h2",{id:"singletons"},[t("a",{class:"header-anchor",href:"#singletons","aria-hidden":"true"},"#"),p(" Singletons")],-1),k=t("p",null,[p("This one is easy, any object marked as the "),t("em",null,"Singleton"),p(" lifecycle that implements "),t("code",null,"IDisposable"),p(" is disposed when the root container is disposed:")],-1),r=e('<p><a id="snippet-sample_singleton-in-action"></a></p><div class="language-cs"><pre><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Fact</span></span><span class="token punctuation">]</span>\n<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">singletons_are_disposed_when_the_container_is_disposed</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">{</span>\n    <span class="token class-name"><span class="token keyword">var</span></span> container <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Container</span><span class="token punctuation">(</span>_ <span class="token operator">=&gt;</span>\n    <span class="token punctuation">{</span>\n        _<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">ForSingletonOf</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>DisposableSingleton<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// As a singleton-scoped object, every request for DisposableSingleton</span>\n    <span class="token comment">// will return the same object</span>\n    <span class="token class-name"><span class="token keyword">var</span></span> singleton <span class="token operator">=</span> container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>DisposableSingleton<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    singleton<span class="token punctuation">.</span><span class="token function">ShouldBeSameAs</span><span class="token punctuation">(</span>container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>DisposableSingleton<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    singleton<span class="token punctuation">.</span><span class="token function">ShouldBeSameAs</span><span class="token punctuation">(</span>container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>DisposableSingleton<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    singleton<span class="token punctuation">.</span><span class="token function">ShouldBeSameAs</span><span class="token punctuation">(</span>container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>DisposableSingleton<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    singleton<span class="token punctuation">.</span><span class="token function">ShouldBeSameAs</span><span class="token punctuation">(</span>container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>DisposableSingleton<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    singleton<span class="token punctuation">.</span>WasDisposed<span class="token punctuation">.</span><span class="token function">ShouldBeFalse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// now, dispose the Container</span>\n    container<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// the SingletonThing scoped object should be disposed</span>\n    singleton<span class="token punctuation">.</span>WasDisposed<span class="token punctuation">.</span><span class="token function">ShouldBeTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/StructureMap.Testing/Acceptance/lifecycle_creation.cs#L22-L48" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_singleton-in-action" title="Start of snippet">anchor</a></sup>\x3c!-- endSnippet --\x3e</p><h2 id="nested-containers"><a class="header-anchor" href="#nested-containers" aria-hidden="true">#</a> Nested Containers</h2><p>As discussed in <a href="/guide/ioc/nested-containers.html">nested containers</a>, any transient or container-scoped object that implements <code>IDisposable</code> and is created by a nested container will be disposed as the nested container is disposed:</p>',5),d=e('<p><a id="snippet-sample_nested-disposal"></a></p><div class="language-cs"><pre><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Fact</span></span><span class="token punctuation">]</span>\n<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">nested_container_disposal</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">{</span>\n    <span class="token class-name"><span class="token keyword">var</span></span> container <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Container</span><span class="token punctuation">(</span>_ <span class="token operator">=&gt;</span>\n    <span class="token punctuation">{</span>\n        <span class="token comment">// A SingletonThing scoped service</span>\n        _<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">ForSingletonOf</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IColorCache<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Use</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>ColorCache<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token comment">// A transient scoped service</span>\n        _<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IColor<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Use</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Green<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        \n        \n        <span class="token comment">// An AlwaysUnique scoped service</span>\n        _<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">AddTransient</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Purple<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        _<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">AddTransient</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Blue<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">ColorCache</span> singleton <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n    <span class="token class-name">Green</span> nestedGreen <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n    <span class="token class-name">Blue</span> nestedBlue <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n    <span class="token class-name">Purple</span> nestedPurple <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> nested <span class="token operator">=</span> container<span class="token punctuation">.</span><span class="token function">GetNestedContainer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        <span class="token comment">// SingletonThing&#39;s are really built by the parent</span>\n        singleton <span class="token operator">=</span> nested<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IColorCache<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n            <span class="token punctuation">.</span><span class="token generic-method"><span class="token function">ShouldBeOfType</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>ColorCache<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        nestedGreen <span class="token operator">=</span> nested<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IColor<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n            <span class="token punctuation">.</span><span class="token generic-method"><span class="token function">ShouldBeOfType</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Green<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        nestedBlue <span class="token operator">=</span> nested<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Blue<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        nestedPurple <span class="token operator">=</span> nested<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Purple<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token comment">// Transients created by the Nested Container</span>\n    <span class="token comment">// are disposed</span>\n    nestedGreen<span class="token punctuation">.</span>WasDisposed<span class="token punctuation">.</span><span class="token function">ShouldBeTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    nestedBlue<span class="token punctuation">.</span>WasDisposed<span class="token punctuation">.</span><span class="token function">ShouldBeTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// Unique&#39;s created by the Nested Container</span>\n    <span class="token comment">// are disposed</span>\n    nestedPurple<span class="token punctuation">.</span>WasDisposed<span class="token punctuation">.</span><span class="token function">ShouldBeTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// NOT disposed because it&#39;s owned by</span>\n    <span class="token comment">// the parent container</span>\n    singleton<span class="token punctuation">.</span>WasDisposed<span class="token punctuation">.</span><span class="token function">ShouldBeFalse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar.Testing/IoC/Acceptance/nested_container.cs#L100-L153" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_nested-disposal" title="Start of snippet">anchor</a></sup><a id="snippet-sample_nested-disposal-1"></a></p><div class="language-cs"><pre><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Fact</span></span><span class="token punctuation">]</span>\n<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">nested_container_disposal</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">{</span>\n    <span class="token class-name"><span class="token keyword">var</span></span> container <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Container</span><span class="token punctuation">(</span>_ <span class="token operator">=&gt;</span>\n    <span class="token punctuation">{</span>\n        <span class="token comment">// A SingletonThing scoped service</span>\n        _<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">ForSingletonOf</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IColorCache<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Use</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>ColorCache<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token comment">// A transient scoped service</span>\n        _<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IColor<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Use</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Green<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token comment">// An AlwaysUnique scoped service</span>\n        _<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">For</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Purple<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">AlwaysUnique</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">ColorCache</span> singleton <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n    <span class="token class-name">Green</span> nestedGreen <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n    <span class="token class-name">Blue</span> nestedBlue <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n    <span class="token class-name">Purple</span> nestedPurple <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> nested <span class="token operator">=</span> container<span class="token punctuation">.</span><span class="token function">GetNestedContainer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        <span class="token comment">// SingletonThing&#39;s are really built by the parent</span>\n        singleton <span class="token operator">=</span> nested<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IColorCache<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n            <span class="token punctuation">.</span><span class="token generic-method"><span class="token function">ShouldBeOfType</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>ColorCache<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        nestedGreen <span class="token operator">=</span> nested<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IColor<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n            <span class="token punctuation">.</span><span class="token generic-method"><span class="token function">ShouldBeOfType</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Green<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        nestedBlue <span class="token operator">=</span> nested<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Blue<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        nestedPurple <span class="token operator">=</span> nested<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Purple<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token comment">// Transients created by the Nested Container</span>\n    <span class="token comment">// are disposed</span>\n    nestedGreen<span class="token punctuation">.</span>WasDisposed<span class="token punctuation">.</span><span class="token function">ShouldBeTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    nestedBlue<span class="token punctuation">.</span>WasDisposed<span class="token punctuation">.</span><span class="token function">ShouldBeTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// Unique&#39;s created by the Nested Container</span>\n    <span class="token comment">// are disposed</span>\n    nestedPurple<span class="token punctuation">.</span>WasDisposed<span class="token punctuation">.</span><span class="token function">ShouldBeTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// NOT disposed because it&#39;s owned by</span>\n    <span class="token comment">// the parent container</span>\n    singleton<span class="token punctuation">.</span>WasDisposed<span class="token punctuation">.</span><span class="token function">ShouldBeFalse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/StructureMap.Testing/Acceptance/nested_containers.cs#L121-L170" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_nested-disposal-1" title="Start of snippet">anchor</a></sup>\x3c!-- endSnippet --\x3e</p><h2 id="transients"><a class="header-anchor" href="#transients" aria-hidden="true">#</a> Transients</h2><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>This behavior is different from StructureMap. Be aware of this, or you may be vulnerable to memory leaks.</p></div><p>Objects that implement <code>IDisposable</code> are tracked by the container that creates them and will be disposed whenever that container itself is disposed.</p>',8);c.render=function(t,p,e,o,c,m){return n(),s("div",null,[l,u,i,k,a(" snippet: sample_singleton-in-action "),r,a(" snippet: sample_nested-disposal "),d])};export{o as __pageData,c as default};
