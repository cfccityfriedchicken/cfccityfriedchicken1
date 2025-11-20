import React from 'react';
import { Loader2 } from 'lucide-react';

const Spinner: React.FC = () => (
  <div className="flex justify-center items-center p-8">
    <Loader2 className="w-10 h-10 text-brand-primary animate-spin" />
  </div>
);

export default Spinner;