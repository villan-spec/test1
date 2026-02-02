import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { BlueprintView } from './components/BlueprintView';
import { TradeAnalyzer } from './components/TradeAnalyzer';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'blueprint' | 'analyzer'>('analyzer');

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'blueprint' ? <BlueprintView /> : <TradeAnalyzer />}
    </Layout>
  );
};
export default App;