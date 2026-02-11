import React from 'react';
import { Mail, Phone, MoreHorizontal, UserCheck, UserMinus, UserX } from 'lucide-react';

const Team: React.FC = () => {
  const teamMembers = [
    { name: "Alex M.", role: "L1 Support", status: "Online", load: 12, avatar: "https://picsum.photos/100/100?random=user", skills: ['Billing', 'General'] },
    { name: "Sarah J.", role: "L2 Technical", status: "Busy", load: 8, avatar: "https://picsum.photos/100/100?random=6", skills: ['API', 'Infra'] },
    { name: "Mike R.", role: "L3 Engineering", status: "Offline", load: 2, avatar: "https://picsum.photos/100/100?random=7", skills: ['Backend', 'Security'] },
    { name: "Emily W.", role: "Customer Success", status: "Online", load: 5, avatar: "https://picsum.photos/100/100?random=8", skills: ['Onboarding', 'Expansion'] },
    { name: "David L.", role: "Billing Specialist", status: "Busy", load: 15, avatar: "https://picsum.photos/100/100?random=9", skills: ['Refunds', 'Disputes'] },
    { name: "Jessica T.", role: "L1 Support", status: "Online", load: 9, avatar: "https://picsum.photos/100/100?random=10", skills: ['General', 'Account'] },
  ];

  return (
    <div className="flex-1 h-screen bg-slate-50 overflow-y-auto p-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-800">Team Availability</h1>
           <p className="text-slate-500">Monitor agent status and workload distribution.</p>
        </div>
        <div className="flex gap-3">
          <button className="text-slate-600 px-4 py-2 rounded-lg border border-slate-200 font-medium hover:bg-white bg-slate-50">
            Filter by Skill
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-blue-700">
             Add Member
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {teamMembers.map((member, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
               <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                     <div className="relative">
                        <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm" />
                        <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                            member.status === 'Online' ? 'bg-green-500' : member.status === 'Busy' ? 'bg-orange-500' : 'bg-slate-400'
                        }`} />
                     </div>
                     <div>
                        <h3 className="font-bold text-slate-800">{member.name}</h3>
                        <p className="text-xs text-slate-500 font-medium">{member.role}</p>
                     </div>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-50 rounded">
                     <MoreHorizontal className="w-5 h-5" />
                  </button>
               </div>
               
               {/* Skills Tags */}
               <div className="flex gap-2 flex-wrap">
                  {member.skills.map((skill, sIdx) => (
                     <span key={sIdx} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] uppercase font-bold tracking-wide rounded">
                        {skill}
                     </span>
                  ))}
               </div>
               
               <div className="grid grid-cols-2 gap-3 mt-1">
                  <div className="bg-slate-50 p-3 rounded-lg text-center border border-slate-100">
                     <p className="text-[10px] text-slate-400 mb-1 uppercase font-bold tracking-wider">Status</p>
                     <p className={`text-sm font-bold ${
                        member.status === 'Online' ? 'text-green-600' : member.status === 'Busy' ? 'text-orange-600' : 'text-slate-500'
                     }`}>{member.status}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg text-center border border-slate-100">
                     <p className="text-[10px] text-slate-400 mb-1 uppercase font-bold tracking-wider">Active Tickets</p>
                     <p className="text-sm font-bold text-slate-800">{member.load}</p>
                  </div>
               </div>
               
               <div className="flex gap-3 mt-2">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                     <Mail className="w-4 h-4" /> Message
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                     <UserCheck className="w-4 h-4" /> Assign
                  </button>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};

export default Team;