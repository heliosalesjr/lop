import React, { useState, useEffect } from 'react';
import { ExternalLink, Calendar, RefreshCw } from 'lucide-react';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  urlToImage?: string;
}

const LGBTQNews: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar notícias usando News API
  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
      
      if (!API_KEY) {
        throw new Error('API Key not configured');
      }

      // Optimized query to capture relevant LGBTQ+ news in English
      // Using operators to search for specific terms
      const queries = [
        'LGBTQ+ OR LGBT OR "LGBT community"',
        '"LGBT rights" OR "LGBTQ rights" OR "gay rights"',
        '"gay pride" OR "pride parade" OR "pride month"',
        'transgender OR "trans rights" OR "gender identity"',
        '"same-sex marriage" OR "marriage equality"',
        'homophobia OR transphobia OR "LGBT discrimination"',
        '"sexual diversity" OR "gender diversity"',
        '"coming out" OR "LGBT activism"'
      ];

      // Makes multiple searches to get variety of news
      const allArticles: NewsArticle[] = [];
      
      for (let i = 0; i < Math.min(queries.length, 3); i++) {
        const query = queries[i];
        const url = `https://newsapi.org/v2/everything?` +
          `q=${encodeURIComponent(query)}&` +
          `language=en&` +
          `sortBy=publishedAt&` +
          `pageSize=5&` +
          `from=${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()}&` + // Last 7 days
          `apiKey=${API_KEY}`;
        
        try {
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            if (data.status === 'ok' && data.articles) {
              // Filter valid articles and add to list
              const validArticles = data.articles
                .filter((article: any) => 
                  article.title && 
                  article.description && 
                  article.url &&
                  article.title !== '[Removed]' &&
                  article.description !== '[Removed]'
                )
                .map((article: any) => ({
                  title: article.title,
                  description: article.description,
                  url: article.url,
                  publishedAt: article.publishedAt,
                  source: article.source?.name || 'Unknown source',
                  urlToImage: article.urlToImage
                }));
              
              allArticles.push(...validArticles);
            }
          }
        } catch (queryError) {
          console.warn(`Error in query "${query}":`, queryError);
        }
      }

      if (allArticles.length > 0) {
        // Remove duplicates based on title
        const uniqueArticles = allArticles.filter((article, index, self) =>
          index === self.findIndex(a => a.title === article.title)
        );
        
        // Sort by date and get the 3 most recent
        const sortedArticles = uniqueArticles
          .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
          .slice(0, 3);
        
        setArticles(sortedArticles);
      } else {
        throw new Error('No news found');
      }
      
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Unable to load news');
      
      // Fallback with mock data for demonstration
      setArticles([
        {
          title: "Pride Month 2024 Sees Record-Breaking Global Participation",
          description: "Cities worldwide celebrate with unprecedented attendance at Pride events, highlighting growing acceptance and support for LGBTQ+ rights.",
          url: "#",
          publishedAt: "2024-06-03T10:00:00Z",
          source: "LGBT+ Today",
          urlToImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=200&fit=crop"
        },
        {
          title: "New Workplace Anti-Discrimination Laws Passed",
          description: "Historic legislation ensures protection for LGBTQ+ employees, establishing penalties for companies that discriminate based on sexual orientation or gender identity.",
          url: "#",
          publishedAt: "2024-06-02T14:30:00Z",
          source: "Rights Today",
          urlToImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=200&fit=crop"
        },
        {
          title: "Same-Sex Marriages Increase 45% Globally",
          description: "New statistics show significant growth in officially registered same-sex unions, reflecting changing attitudes toward marriage equality.",
          url: "#",
          publishedAt: "2024-06-01T09:15:00Z",
          source: "Global Statistics",
          urlToImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=200&fit=crop"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleRefresh = () => {
    fetchNews();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-4 bg-white/30 dark:bg-gray-800/30 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <span className="text-2xl">🏳️‍🌈</span>
          LGBTQ+ News
        </h2>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 dark:bg-purple-700 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-800 disabled:opacity-50 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-700 dark:text-red-300">{error}</p>
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">Showing sample news.</p>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="w-24 h-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article, index) => (
            <article
              key={index}
              className="flex gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md dark:hover:shadow-gray-900/20 transition-shadow group bg-white/50 dark:bg-gray-800/50"
            >
              {article.urlToImage && (
                <div className="flex-shrink-0">
                  <img
                    src={article.urlToImage}
                    alt=""
                    className="w-24 h-20 object-cover rounded-md"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                  {article.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(article.publishedAt)}
                    </span>
                    <span>{article.source}</span>
                  </div>
                  
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors"
                  >
                    <span>Read more</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {articles.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No news found at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default LGBTQNews;