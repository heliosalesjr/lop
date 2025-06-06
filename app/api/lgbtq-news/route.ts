export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('API route called!');
  const API_KEY = process.env.NEWS_API_KEY;
  console.log('API_KEY exists:', !!API_KEY);
  
  if (!API_KEY) {
    return NextResponse.json({ error: 'API Key not configured' }, { status: 500 });
  }

  try {
    const queries = [
      'LGBTQ+ OR LGBT OR "LGBT community"',
      '"LGBT rights" OR "LGBTQ rights" OR "gay rights"',
      '"gay pride" OR "pride parade" OR "pride month"'
    ];

    const allArticles: any[] = [];
    
    for (let i = 0; i < Math.min(queries.length, 3); i++) {
      const query = queries[i];
      const url = `https://newsapi.org/v2/everything?` +
        `q=${encodeURIComponent(query)}&` +
        `language=en&` +
        `sortBy=publishedAt&` +
        `pageSize=5&` +
        `from=${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()}&` +
        `apiKey=${API_KEY}`;
      
      try {
        const response = await fetch(url, { cache: 'no-store' });
        if (response.ok) {
          const data = await response.json();
          if (data.status === 'ok' && data.articles) {
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
      const uniqueArticles = allArticles.filter((article, index, self) =>
        index === self.findIndex(a => a.title === article.title)
      );
      
      const sortedArticles = uniqueArticles
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, 3);
      
      return NextResponse.json({ articles: sortedArticles });
    } else {
      return NextResponse.json({ articles: [] });
    }
    
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
