import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, updateDoc, doc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { useLanguage } from '../context/LanguageContext';

interface Answer {
  text: string;
  createdAt: any;
}

interface Question {
  id: string;
  text: string;
  createdAt: any;
  answers: Answer[];
}

export const QASection: React.FC = () => {
  const { t } = useLanguage();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswers, setNewAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    const q = query(collection(db, 'questions'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const qData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Question[];
      setQuestions(qData);
    });
    return unsubscribe;
  }, []);

  const handleAddQuestion = async () => {
    if (!newQuestion.trim()) return;
    await addDoc(collection(db, 'questions'), {
      text: newQuestion,
      createdAt: serverTimestamp(),
      answers: []
    });
    setNewQuestion('');
  };

  const handleAddAnswer = async (questionId: string) => {
    const answerText = newAnswers[questionId];
    if (!answerText || !answerText.trim()) return;
    const questionRef = doc(db, 'questions', questionId);
    await updateDoc(questionRef, {
      answers: arrayUnion({
        text: answerText,
        createdAt: serverTimestamp()
      })
    });
    setNewAnswers({ ...newAnswers, [questionId]: '' });
  };

  return (
    <section className="p-6 max-w-2xl mx-auto bg-transparent backdrop-blur-md border border-slate-200/50 shadow-lg rounded-3xl" id="qa">
      <h2 className="text-2xl font-bold mb-4 text-slate-900 text-center">{t.earnSoon || 'Earn Section, coming soon'}</h2>

      {questions.map((q) => (
        <div key={q.id} className="border border-slate-200/50 bg-white/50 p-4 mb-4 rounded-2xl">
          <p className="font-bold text-slate-900">{q.text}</p>
          <div className="ml-4 mt-2">
            {q.answers.map((a, idx) => (
              <p key={idx} className="text-sm text-slate-700">— {a.text}</p>
            ))}
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={newAnswers[q.id] || ''}
                onChange={(e) => setNewAnswers({ ...newAnswers, [q.id]: e.target.value })}
                className="flex-1 bg-white/50 border border-slate-300 p-1 rounded-lg text-sm text-slate-900 placeholder-slate-500"
                placeholder="উত্তর দিন..."
              />
              <button onClick={() => handleAddAnswer(q.id)} className="bg-blue-600 text-white px-2 py-1 rounded-lg text-sm hover:bg-blue-700">উত্তর দিন</button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
