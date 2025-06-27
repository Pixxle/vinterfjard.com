import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface GistMatter {
  title: string;
  date: string;
  tags?: string[];
  [key: string]: unknown;
}

export interface Gist {
  slug: string;
  title: string;
  date: string;
  tags?: string[];
  content: string;
  excerpt: string;
  isLong: boolean;
}

const gistsDirectory = path.join(process.cwd(), 'gists');

export function getAllGists(): Gist[] {
  // Check if gists directory exists
  if (!fs.existsSync(gistsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(gistsDirectory);
  const allGists = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((name) => {
      const slug = name.replace(/\.md$/, '');
      return getGistBySlug(slug);
    })
    .filter((gist): gist is Gist => gist !== null);

  // Sort gists by date (newest first)
  return allGists.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getGistBySlug(slug: string): Gist | null {
  try {
    const fullPath = path.join(gistsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const matterData = data as GistMatter;

    // Generate excerpt (first 10 lines or first paragraph)
    const lines = content.split('\n');
    const excerpt = lines.slice(0, 10).join('\n');
    const isLong = lines.length > 10;

    return {
      slug,
      title: matterData.title || slug,
      date: matterData.date || new Date().toISOString().split('T')[0],
      tags: matterData.tags || [],
      content,
      excerpt,
      isLong,
    };
  } catch (error) {
    console.error(`Error reading gist ${slug}:`, error);
    return null;
  }
}

export function getGistSlugs(): string[] {
  if (!fs.existsSync(gistsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(gistsDirectory);
  return fileNames
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''));
}