import{o as n,c as s,a,b as e}from"./app.213acb6a.js";const t='{"title":"Generating Code with ISourceWriter","description":"","frontmatter":{},"headers":[{"level":2,"title":"The Basics","slug":"the-basics"},{"level":2,"title":"Advanced Usages","slug":"advanced-usages"}],"relativePath":"guide/compilation/source-writer.md","lastUpdated":1629732345321}',o={},p=e('<h1 id="generating-code-with-isourcewriter"><a class="header-anchor" href="#generating-code-with-isourcewriter" aria-hidden="true">#</a> Generating Code with ISourceWriter</h1><div class="tip custom-block"><p class="custom-block-title">INFO</p><p>As of Lamar v3.0, all of the code compilation is contained in the LamarCodeGeneration NuGet, and can be used independently of Lamar itself.</p></div><p>This code was originally written and proven out in the related <a href="https://jasperfx.github.io/marten" target="_blank" rel="noopener noreferrer">Marten</a> and described in a post titled <a href="https://jeremydmiller.com/2015/11/11/using-roslyn-for-runtime-code-generation-in-marten/" target="_blank" rel="noopener noreferrer">Using Roslyn for Runtime Code Generation in Marten</a>. This code was ripped out of Marten itself, but it&#39;s happily running now in Lamar a couple years later.</p><p>Lamar provides the <code>LamarCodeGeneration.ISourceWriter</code> service -- and a lot of related extension methods -- to help write common code constructs and maintain legible code indention just like you&#39;d use if you were writing the code in an editor or IDE.</p><h2 id="the-basics"><a class="header-anchor" href="#the-basics" aria-hidden="true">#</a> The Basics</h2><p>To dip our toes into source generation, let&#39;s write a simple method to a string that would just write out &quot;Hello&quot; to the console:</p>',6),c=e('<p><a id="snippet-sample_simple-usage-of-source-writer"></a></p><div class="language-cs"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> writer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SourceWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nwriter<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">@&quot;\nBLOCK:public void SayHello()\nConsole.WriteLine(&#39;Hello&#39;);\nEND\n&quot;</span><span class="token punctuation">.</span><span class="token function">Replace</span><span class="token punctuation">(</span><span class="token string">&quot;&#39;&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\\&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nConsole<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>writer<span class="token punctuation">.</span><span class="token function">Code</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/LamarCompiler.Testing/Samples/UsingSourceWriter.cs#L20-L30" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_simple-usage-of-source-writer" title="Start of snippet">anchor</a></sup>\x3c!-- endSnippet --\x3e</p><p>After that code, the value of the <code>SourceWriter.Code()</code> method is this text:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Go</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">{</span>\n    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>A few notes on what <code>SourceWriter.Write()</code> is doing:</p><ul><li>Starting a line with <em>BLOCK:</em> tells Lamar to write an open bracket &#39;{&#39; on the next line of code and to increment the leading spaces for subsequent lines</li><li>The <code>Write()</code> method is processing each line in the text one at a time, so the call to <code>Console.WriteLine(&quot;Hello&quot;)</code> would be indented because it is inside a code block for the method</li><li>The <em>END</em> text tells Lamar to write a closing &#39;}&#39; bracket on the next line, then decrement the leading spaces for the next lines of code</li></ul><p>Other basic method usages are shown below:</p>',8),i=e('<p><a id="snippet-sample_other-sourcewriter-basics"></a></p><div class="language-cs"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> writer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SourceWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// Write an empty line into the code </span>\nwriter<span class="token punctuation">.</span><span class="token function">BlankLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// Writes a single line into the code</span>\n<span class="token comment">// with the proper indention. Does NOT</span>\n<span class="token comment">// respect the BLOCK: and END directives</span>\nwriter<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;// A comment&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// Writes a closing &#39;}&#39; character into the </span>\n<span class="token comment">// next line and decrements the leading space</span>\n<span class="token comment">// indention for the following lines of code</span>\nwriter<span class="token punctuation">.</span><span class="token function">FinishBlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/LamarCompiler.Testing/Samples/UsingSourceWriter.cs#L37-L52" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_other-sourcewriter-basics" title="Start of snippet">anchor</a></sup>\x3c!-- endSnippet --\x3e</p><h2 id="advanced-usages"><a class="header-anchor" href="#advanced-usages" aria-hidden="true">#</a> Advanced Usages</h2><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>All the usages in this section are from extension methods in the <code>Lamar.Compilation</code> namespace</p></div><p>Here are some of the advanced usages of <code>ISourceWriter</code>:</p>',6),r=e('<p><a id="snippet-sample_sourcewriteradvanced"></a></p><div class="language-cs"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> writer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SourceWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// Add &quot;using [namespace]; statements</span>\nwriter<span class="token punctuation">.</span><span class="token function">UsingNamespace</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">Console</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Namespace<span class="token punctuation">)</span><span class="token punctuation">;</span>\nwriter<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">UsingNamespace</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IOperation<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nwriter<span class="token punctuation">.</span><span class="token function">Namespace</span><span class="token punctuation">(</span><span class="token string">&quot;GeneratedCode&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// Write new classes and code within the namespace</span>\nwriter<span class="token punctuation">.</span><span class="token function">FinishBlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n\n<span class="token comment">// Helper to write using blocks in C# code</span>\nwriter<span class="token punctuation">.</span><span class="token function">UsingBlock</span><span class="token punctuation">(</span><span class="token string">&quot;var conn = new SqlConnection()&quot;</span><span class="token punctuation">,</span> w <span class="token operator">=&gt;</span>\n<span class="token punctuation">{</span>\n    w<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;conn.Open();&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">// other statements</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n\n\n<span class="token comment">// Write a comment text into the code at the correct indention</span>\n<span class="token comment">// level</span>\nwriter<span class="token punctuation">.</span><span class="token function">WriteComment</span><span class="token punctuation">(</span><span class="token string">&quot;Some message&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n\n<span class="token comment">// Start the declaration of a new public class named &quot;MyClass&quot;</span>\n<span class="token comment">// that implements the IDisposable interface</span>\nwriter<span class="token punctuation">.</span><span class="token function">StartClass</span><span class="token punctuation">(</span><span class="token string">&quot;MyClass&quot;</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">IDisposable</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/LamarCompiler.Testing/Samples/UsingSourceWriter.cs#L58-L87" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_sourcewriteradvanced" title="Start of snippet">anchor</a></sup>\x3c!-- endSnippet --\x3e</p>',3);o.render=function(e,t,o,l,u,k){return n(),s("div",null,[p,a(" snippet: sample_simple-usage-of-source-writer "),c,a(" snippet: sample_other-sourcewriter-basics "),i,a(" snippet: sample_SourceWriterAdvanced "),r])};export{t as __pageData,o as default};
