/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { MainContent } from './components/MainContent';
import { Modals } from './components/Modals';

export default function App() {
  const [modalType, setModalType] = useState<'login' | 'signup' | 'help' | null>(null);

  const openModal = (type: 'login' | 'signup' | 'help') => setModalType(type);
  const closeModal = () => setModalType(null);

  return (
    <LanguageProvider>
      <MainContent openModal={openModal} />
      <Modals modalType={modalType} closeModal={closeModal} />
    </LanguageProvider>
  );
}
