'use client';

import { useEcho } from '@/context/EchoProvider';
import { EchoAccountButton } from './echo-account';

export function EchoAccount() {
  const echo = useEcho();
  return <EchoAccountButton echo={echo} />;
}
