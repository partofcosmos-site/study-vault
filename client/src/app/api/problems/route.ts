import { NextResponse } from 'next/server';
import problems from '../../../data/problems.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const subject = searchParams.get('subject');
  const query = searchParams.get('query')?.toLowerCase();

  let filteredProblems = problems;

  if (subject && subject !== 'All') {
    filteredProblems = filteredProblems.filter(p => p.subject === subject);
  }

  if (query) {
    filteredProblems = filteredProblems.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.topic.toLowerCase().includes(query) ||
      p.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  return NextResponse.json(filteredProblems);
}
