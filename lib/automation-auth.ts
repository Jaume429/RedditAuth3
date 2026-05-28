import { NextRequest, NextResponse } from 'next/server';

function configuredKeys() {
  return (process.env.AI_AUTOMATION_API_KEYS || '')
    .split(',')
    .map((key) => key.trim())
    .filter(Boolean);
}

export function requireAutomationAuth(request: NextRequest) {
  const keys = configuredKeys();
  const authDisabled = process.env.AI_AUTOMATION_REQUIRE_AUTH === 'false' && process.env.NODE_ENV !== 'production';

  if (authDisabled) {
    return null;
  }

  if (keys.length === 0) {
    return NextResponse.json(
      { error: 'Automation API is locked. Configure AI_AUTOMATION_API_KEYS before using it.' },
      { status: 503 }
    );
  }

  const header = request.headers.get('authorization') || request.headers.get('x-api-key') || '';
  const token = header.startsWith('Bearer ') ? header.slice('Bearer '.length).trim() : header.trim();

  if (!keys.includes(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return null;
}
