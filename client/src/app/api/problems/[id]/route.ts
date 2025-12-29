import { NextResponse } from 'next/server';
import { problems } from '../../../../lib/data';

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const problem = problems.find(p => p.id === params.id);

  if (!problem) {
    return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
  }

  return NextResponse.json(problem);
}
