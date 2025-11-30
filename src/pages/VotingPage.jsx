import React from 'react';

const VotingPage = ({ candidates }) => (
  <div className="p-6 animate-fade-in pb-24">
     <div className="mb-6 border-l-4 border-amber-500 pl-3">
       <h2 className="text-2xl font-bold text-slate-900 font-serif">Live Count</h2>
       <p className="text-slate-500 text-xs mt-1">Hasil perolehan suara sementara.</p>
     </div>
     
     <div className="space-y-4">
       {candidates.map(c => {
          const total = candidates.reduce((a, b) => a + (b.vote_count || 0), 0);
          const pct = total === 0 ? 0 : Math.round(((c.vote_count || 0) / total) * 100);
          
          return (
            <div key={c.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
               <div className="flex justify-between mb-2">
                 <span className="font-bold text-slate-900 font-serif">{c.name}</span>
                 <span className="font-bold text-amber-600">{pct}%</span>
               </div>
               
               {/* Progress Bar */}
               <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-slate-900 h-full transition-all duration-1000 ease-out" 
                    style={{ width: `${pct}%` }}
                  ></div>
               </div>
               
               <p className="text-xs text-slate-400 mt-2 text-right">{c.vote_count || 0} Suara</p>
            </div>
          )
       })}
     </div>
  </div>
);

export default VotingPage;