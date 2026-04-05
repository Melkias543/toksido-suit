"use client";

import CentralDashboard from '@/components/ui/dashboard-with-collapsible-sidebar';
import React, { useState } from 'react'

function Orders() {
    const [isDark, setIsDark] = useState(false);
  return (
    <div>
      <CentralDashboard isDark={isDark} setIsDark={setIsDark} />
    </div>
  );
}

export default Orders