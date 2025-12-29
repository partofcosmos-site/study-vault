import { NextResponse } from 'next/server';
import problems from '../../../../../../server/data/problems.json';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const problem = problems.find(p => p.id === params.id);

  if (!problem) {
    return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
  }

  return NextResponse.json(problem);
}
