import React, { useState, useEffect } from 'react';
import Web from '../components/Web';
import { 
  User, BookOpen, ClipboardList, LayoutDashboard, Save, 
  GraduationCap, Plus, Trash2, Eye, Download, Calendar,
  CheckCircle, XCircle, FileText, ChevronDown, ChevronUp,
  Printer, RefreshCw
} from 'lucide-react';

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function Saved() {
  const [activeTab, setActiveTab] = useState('saved');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [studentInfo, setStudentInfo] = useState({ name: '', id: '', mobile: '' });
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState({ code: '', name: '' });
  const [attendance, setAttendance] = useState([]);
  const [attendanceForm, setAttendanceForm] = useState({
    month: 'January', subjectCode: '', totalLectures: 0, presentLectures: 0
  });
  const [expandedSections, setExpandedSections] = useState({
    profile: true, subjects: true, attendance: true
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem('studentDashboardData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setStudentInfo(parsed.studentInfo || { name: '', id: '', mobile: '' });
      setSubjects(parsed.subjects || []);
      setAttendance(parsed.attendance || []);
    }
  }, []);

  useEffect(() => {
    const data = { studentInfo, subjects, attendance };
    localStorage.setItem('studentDashboardData', JSON.stringify(data));
  }, [studentInfo, subjects, attendance]);

  const saveProfile = (e) => {
    e.preventDefault();
    alert('Profile Saved Successfully!');
  };

  const addSubject = (e) => {
    e.preventDefault();
    if (newSubject.code && newSubject.name) {
      const exists = subjects.find(s => s.code === newSubject.code);
      if (!exists) {
        setSubjects([...subjects, newSubject]);
        setNewSubject({ code: '', name: '' });
        alert('Subject Added!');
      }
    }
  };

  const deleteSubject = (code) => {
    if (window.confirm('Delete this subject?')) {
      setSubjects(subjects.filter(s => s.code !== code));
      setAttendance(attendance.filter(a => a.subjectCode !== code));
    }
  };

  const saveAttendance = (e) => {
    e.preventDefault();
    if (!attendanceForm.subjectCode) { alert('Please select a subject!'); return; }
    const newEntry = { ...attendanceForm, totalLectures: parseInt(attendanceForm.totalLectures), presentLectures: parseInt(attendanceForm.presentLectures) };
    const existingIndex = attendance.findIndex(a => a.month === attendanceForm.month && a.subjectCode === attendanceForm.subjectCode);
    if (existingIndex >= 0) {
      const updated = [...attendance];
      updated[existingIndex] = newEntry;
      setAttendance(updated);
    } else {
      setAttendance([...attendance, newEntry]);
    }
    alert('Attendance Saved!');
  };

  const clearAllData = () => {
    if (window.confirm('Delete ALL data?')) {
      setStudentInfo({ name: '', id: '', mobile: '' });
      setSubjects([]);
      setAttendance([]);
      localStorage.removeItem('studentDashboardData');
    }
  };

  const getSubjectStats = (subjectCode) => {
    const subAttendance = attendance.filter(a => a.subjectCode === subjectCode);
    let total = 0, present = 0;
    subAttendance.forEach(a => { total += a.totalLectures; present += a.presentLectures; });
    return { total, present, percentage: total > 0 ? ((present / total) * 100).toFixed(1) : 0 };
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const getSubjectName = (code) => {
    const sub = subjects.find(s => s.code === code);
    return sub ? sub.name : code;
  };

  const cardStyle = {
    transform: `perspective(1000px) rotateY(${mousePosition.x * 3}deg) rotateX(${-mousePosition.y * 3}deg)`,
    transition: 'transform 0.3s ease-out',
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-20 left-20 w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center animate-float backdrop-blur-sm">
          <GraduationCap className="w-8 h-8 text-cyan-400" />
        </div>
      </div>

      <Web />
      
      <header className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Student Dashboard</h1>
                <p className="text-cyan-200 text-sm">Attendance Management System</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => window.print()} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center gap-2 transition-all duration-300 border border-white/10">
                <Printer className="w-4 h-4" /> Print
              </button>
              <button onClick={clearAllData} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-2 transition-all duration-300">
                <Trash2 className="w-4 h-4" /> Clear All
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-64">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden sticky top-6">
              <nav className="p-2">
                {[
                  { id: 'profile', icon: User, label: 'Student Profile' },
                  { id: 'subjects', icon: BookOpen, label: 'Subjects' },
                  { id: 'attendance', icon: ClipboardList, label: 'Mark Attendance' },
                  { id: 'saved', icon: FileText, label: 'Saved Data' }
                ].map(item => (
                  <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 mb-2 ${activeTab === item.id ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white shadow-lg' : 'text-white/80 hover:bg-white/10'}`}>
                    <item.icon className="w-5 h-5" /> {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <main className="flex-1">
            {activeTab === 'profile' && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6" style={cardStyle}>
                <h2 className="text-2xl font-bold text-white mb-6">Student Profile</h2>
                <form onSubmit={saveProfile} className="space-y-5 max-w-xl">
                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2">Student Name</label>
                    <input type="text" value={studentInfo.name} onChange={e => setStudentInfo({...studentInfo, name: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-cyan-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2">Student ID</label>
                    <input type="text" value={studentInfo.id} onChange={e => setStudentInfo({...studentInfo, id: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-cyan-500" />
                  </div>
                  <button type="submit" className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white px-8 py-3 rounded-xl hover:from-cyan-400 hover:to-pink-400 flex items-center gap-2 transition-all duration-300 transform hover:scale-105">
                    <Save className="w-5 h-5" /> Save Profile
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'subjects' && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6" style={cardStyle}>
                <h2 className="text-2xl font-bold text-white mb-6">Subject Management</h2>
                <div className="bg-white/5 p-5 rounded-xl mb-8 border border-white/10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" value={newSubject.code} onChange={e => setNewSubject({...newSubject, code: e.target.value.toUpperCase()})} placeholder="Subject Code" className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-pink-500" />
                    <input type="text" value={newSubject.name} onChange={e => setNewSubject({...newSubject, name: e.target.value})} placeholder="Subject Name" className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-pink-500" />
                  </div>
                  <button onClick={addSubject} className="mt-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2.5 rounded-xl hover:from-pink-400 hover:to-rose-400 flex items-center gap-2 transition-all duration-300 transform hover:scale-105">
                    <Plus className="w-5 h-5" /> Add Subject
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {subjects.map(sub => (
                    <div key={sub.code} className="bg-white/10 border border-white/10 rounded-xl p-5 hover:border-pink-500/50 transition-all duration-300 transform hover:-translate-y-2">
                      <div className="flex justify-between items-start">
                        <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1 rounded-full text-sm font-semibold">{sub.code}</span>
                        <button onClick={() => deleteSubject(sub.code)} className="text-red-400 hover:text-red-300"><Trash2 className="w-5 h-5" /></button>
                      </div>
                      <h4 className="font-bold text-white text-lg mt-2">{sub.name}</h4>
                      <p className="text-white/60 text-sm mt-2">Attendance: {getSubjectStats(sub.code).percentage}%</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'attendance' && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6" style={cardStyle}>
                <h2 className="text-2xl font-bold text-white mb-6">Mark Monthly Attendance</h2>
                {subjects.length === 0 ? (
                  <div className="bg-yellow-500/20 border border-yellow-500/50 p-6 rounded-xl text-center">
                    <p className="text-yellow-400">Please add subjects first!</p>
                  </div>
                ) : (
                  <form onSubmit={saveAttendance} className="space-y-5 max-w-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-white/80 mb-2">Select Month</label>
                        <select value={attendanceForm.month} onChange={e => setAttendanceForm({...attendanceForm, month: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 [&>option]:text-black">
                          {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-white/80 mb-2">Select Subject</label>
                        <select value={attendanceForm.subjectCode} onChange={e => setAttendanceForm({...attendanceForm, subjectCode: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 [&>option]:text-black">
                          <option value="">Choose Subject</option>
                          {subjects.map(s => <option key={s.code} value={s.code}>{s.code} - {s.name}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-white/80 mb-2">Total Lectures</label>
                        <input type="number" min="0" value={attendanceForm.totalLectures} onChange={e => setAttendanceForm({...attendanceForm, totalLectures: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-white/80 mb-2">Present Lectures</label>
                        <input type="number" min="0" value={attendanceForm.presentLectures} onChange={e => setAttendanceForm({...attendanceForm, presentLectures: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500" />
                      </div>
                    </div>
                    <button type="submit" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl hover:from-purple-400 hover:to-pink-400 flex items-center gap-2 transition-all duration-300 transform hover:scale-105">
                      <Save className="w-5 h-5" /> Save Attendance
                    </button>
                  </form>
                )}
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2"><FileText className="w-7 h-7 text-cyan-400" /> Saved Data</h2>
                  <p className="text-white/60 mt-1">Complete record of all your information</p>
                </div>

                {['profile', 'subjects', 'attendance'].map((section, idx) => (
                  <div key={section} className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <button onClick={() => toggleSection(section)} className={`w-full p-6 flex items-center justify-between bg-gradient-to-r ${section === 'profile' ? 'from-cyan-500 to-blue-500' : section === 'subjects' ? 'from-green-500 to-emerald-500' : 'from-purple-500 to-pink-500'} text-white`}>
                      <div className="flex items-center gap-3">
                        {section === 'profile' ? <User className="w-6 h-6" /> : section === 'subjects' ? <BookOpen className="w-6 h-6" /> : <ClipboardList className="w-6 h-6" />}
                        <h3 className="text-xl font-bold">{section.charAt(0).toUpperCase() + section.slice(1)}</h3>
                      </div>
                      {expandedSections[section] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                    {expandedSections[section] && (
                      <div className="p-6 border-t border-white/10">
                        {section === 'profile' && (
                          <div className="space-y-2">
                            <p className="text-white"><span className="font-semibold">Name:</span> {studentInfo.name || 'N/A'}</p>
                            <p className="text-white"><span className="font-semibold">Student ID:</span> {studentInfo.id || 'N/A'}</p>
                            <p className="text-white"><span className="font-semibold">Mobile:</span> {studentInfo.mobile || 'N/A'}</p>
                          </div>
                        )}
                        {section === 'subjects' && (
                          subjects.length === 0 ? <p className="text-white/60">No subjects added.</p> : (
                            <ul className="space-y-2">
                              {subjects.map(sub => (
                                <li key={sub.code} className="text-white"><span className="font-semibold">{sub.code}</span> - {sub.name} (Attendance: {getSubjectStats(sub.code).percentage}%)</li>
                              ))}
                            </ul>
                          )
                        )}
                        {section === 'attendance' && (
                          attendance.length === 0 ? <p className="text-white/60">No attendance records.</p> : (
                            <div className="overflow-x-auto">
                              <table className="w-full text-left">
                                <thead>
                                  <tr className="border-b border-white/10">
                                    <th className="px-4 py-2 text-white/60">Month</th>
                                    <th className="px-4 py-2 text-white/60">Subject</th>
                                    <th className="px-4 py-2 text-white/60">Total</th>
                                    <th className="px-4 py-2 text-white/60">Present</th>
                                    <th className="px-4 py-2 text-white/60">%</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {attendance.map((a, idx) => (
                                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                                      <td className="px-4 py-2 text-white">{a.month}</td>
                                      <td className="px-4 py-2 text-white">{getSubjectName(a.subjectCode)}</td>
                                      <td className="px-4 py-2 text-white">{a.totalLectures}</td>
                                      <td className="px-4 py-2 text-white">{a.presentLectures}</td>
                                      <td className="px-4 py-2 text-white">{a.totalLectures > 0 ? ((a.presentLectures / a.totalLectures) * 100).toFixed(1) : 0}%</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

export default Saved;
