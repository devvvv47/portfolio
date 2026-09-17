import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { PortfolioData, CareerItem, CampaignProject, MoreProjectItem, AwardItem, NavMenuItem } from '../types';
import {
  X,
  Lock,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  CheckCircle,
  FileCode,
  LogOut,
  AlertCircle,
  ExternalLink,
  MoveUp,
  MoveDown,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Award,
} from 'lucide-react';
import { MediaUploader } from './MediaUploader';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const {
    data,
    isAdmin,
    loginAdmin,
    logoutAdmin,
    updateData,
    resetToDefault,
    exportDataJson,
    importDataJson,
  } = usePortfolio();

  // Local draft state for editing before saving
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<
    'menus' | 'profile' | 'career' | 'f1' | 'campaigns' | 'more' | 'awards' | 'contact' | 'json'
  >('menus');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('');
  const [jsonText, setJsonText] = useState('');

  // Sync formData when opening modal or data changes
  React.useEffect(() => {
    setFormData(data);
  }, [data, isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(passwordInput)) {
      setAuthError('');
      setPasswordInput('');
    } else {
      setAuthError('비밀번호가 일치하지 않습니다. (비밀번호: 4747)');
    }
  };

  const handleSave = () => {
    updateData(formData);
    setSaveSuccessMessage('모든 변경사항이 성공적으로 저장되었습니다!');
    setTimeout(() => setSaveSuccessMessage(''), 3000);
  };

  const handleReset = () => {
    if (window.confirm('정말 기본 포트폴리오 데이터로 초기화하시겠습니까?')) {
      resetToDefault();
      setFormData(data);
      setSaveSuccessMessage('기본값으로 복원되었습니다.');
      setTimeout(() => setSaveSuccessMessage(''), 3000);
    }
  };

  const handleExportJson = () => {
    setJsonText(exportDataJson());
  };

  const handleImportJson = () => {
    if (importDataJson(jsonText)) {
      setSaveSuccessMessage('JSON 데이터가 성공적으로 적용되었습니다.');
      setTimeout(() => setSaveSuccessMessage(''), 3000);
    } else {
      alert('JSON 형식이 올바르지 않습니다.');
    }
  };

  return (
    <div
      id="admin-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs animate-fade-in"
    >
      <div
        id="admin-modal-content"
        className="bg-[#FAFAFA] border border-black/20 w-full max-w-5xl h-[92vh] flex flex-col shadow-2xl relative text-left rounded-xs overflow-hidden"
      >
        {/* Top Header */}
        <div className="bg-black text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-[#7C3AED]" />
            <span className="font-mono text-xs font-bold tracking-wider uppercase">
              PORTFOLIO ADMIN CMS // 포트폴리오 관리자 모드
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors p-1"
            aria-label="Close Admin Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If NOT Authenticated: Show Password Gate */}
        {!isAdmin ? (
          <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
            <div className="w-full max-w-md bg-white border border-black/10 p-8 shadow-lg text-center">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-[#7C3AED]" />
              </div>
              <h3 className="font-display text-2xl font-bold text-black">
                관리자 인증
              </h3>
              <p className="mt-2 text-xs font-mono text-neutral-600">
                포트폴리오 콘텐츠 수정을 위해 지정된 관리자 비밀번호를 입력해주세요.
              </p>

              <form onSubmit={handleLogin} className="mt-6 space-y-4">
                <div>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="비밀번호 입력 (4747)"
                    className="w-full px-4 py-3 border border-black/20 focus:border-[#7C3AED] focus:outline-hidden text-sm font-mono text-center tracking-widest"
                    autoFocus
                  />
                  {authError && (
                    <p className="mt-2 text-xs font-mono text-red-600 flex items-center justify-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{authError}</span>
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#7C3AED] hover:bg-violet-700 text-white font-mono text-xs tracking-wider uppercase font-bold transition-colors"
                >
                  로그인 (LOGIN)
                </button>
              </form>

              <p className="mt-4 text-[11px] font-mono text-neutral-600">
                * 관리자 비밀번호: <strong>4747</strong>
              </p>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Action Bar & Notification */}
            <div className="bg-white border-b border-black/10 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-neutral-700 font-semibold">인증됨 (김드보라)</span>
                {saveSuccessMessage && (
                  <span className="ml-4 text-emerald-600 font-bold flex items-center gap-1 animate-fade-in">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {saveSuccessMessage}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#7C3AED] text-white hover:bg-violet-700 transition-colors font-bold"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>저장하기 (SAVE)</span>
                </button>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>기본값 복원</span>
                </button>
                <button
                  onClick={logoutAdmin}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-neutral-500 hover:text-black transition-colors"
                  title="관리자 로그아웃"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-[#FAFAFA] border-b border-black/10 px-6 flex overflow-x-auto gap-1 text-xs font-mono">
              {[
                { id: 'menus', label: '00. 메뉴 수정' },
                { id: 'profile', label: '01. 프로필 & 역량' },
                { id: 'career', label: '02. 인턴 경력' },
                { id: 'f1', label: '03. F1 프로젝트' },
                { id: 'campaigns', label: `04. 프로젝트 관리 (${formData.campaigns.length})` },
                { id: 'more', label: `05. 기타 프로젝트 (${formData.moreProjects.length})` },
                { id: 'awards', label: `06. 수상 내역 (${formData.awards.length})` },
                { id: 'contact', label: '07. 연락처 정보' },
                { id: 'json', label: '08. JSON 백업' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3 px-3.5 border-b-2 whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#7C3AED] text-[#7C3AED] font-bold bg-white'
                      : 'border-transparent text-neutral-600 hover:text-black'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Scrollable Form Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
              {/* TAB 0: MENUS */}
              {activeTab === 'menus' && (
                <div className="space-y-6 max-w-3xl">
                  <div className="bg-neutral-50 border border-black/10 p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div>
                        <h4 className="text-sm font-bold text-black font-display">
                          상단 네비게이션 메뉴 관리
                        </h4>
                        <p className="text-xs font-mono text-neutral-500 mt-0.5">
                          사이트 상단 헤더에 표시되는 메뉴 이름, 순서, 노출 여부를 직접 수정할 수 있습니다.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const current = formData.navItems || [
                              { id: 'home', label: 'HOME', visible: true },
                              { id: 'profile', label: 'PROFILE', visible: true },
                              { id: 'career', label: 'CAREER', visible: true },
                              { id: 'projects', label: 'PROJECTS', visible: true },
                              { id: 'awards', label: 'AWARDS', visible: true },
                              { id: 'contact', label: 'CONTACT', visible: true },
                            ];
                            const newId = `menu-${Date.now()}`;
                            setFormData({
                              ...formData,
                              navItems: [
                                ...current,
                                { id: newId, label: 'NEW MENU', visible: true },
                              ],
                            });
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#7C3AED] hover:bg-violet-700 text-white font-mono text-xs font-bold transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>메뉴 추가</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              navItems: [
                                { id: 'home', label: 'HOME', visible: true },
                                { id: 'profile', label: 'PROFILE', visible: true },
                                { id: 'career', label: 'CAREER', visible: true },
                                { id: 'projects', label: 'PROJECTS', visible: true },
                                { id: 'awards', label: 'AWARDS', visible: true },
                                { id: 'contact', label: 'CONTACT', visible: true },
                              ],
                            });
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-mono text-xs transition-colors"
                          title="기본 6개 메뉴로 복원"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>기본값</span>
                        </button>
                      </div>
                    </div>

                    {/* Live Preview Bar */}
                    <div className="bg-white border border-black/15 p-3 mb-6">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-2">
                        네비게이션 미리보기 (PREVIEW)
                      </span>
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono tracking-widest">
                        <span className="font-bold text-black border-r border-black/15 pr-4">
                          DEBORAH KIM
                        </span>
                        {(formData.navItems || [
                          { id: 'home', label: 'HOME', visible: true },
                          { id: 'profile', label: 'PROFILE', visible: true },
                          { id: 'career', label: 'CAREER', visible: true },
                          { id: 'projects', label: 'PROJECTS', visible: true },
                          { id: 'awards', label: 'AWARDS', visible: true },
                          { id: 'contact', label: 'CONTACT', visible: true },
                        ])
                          .filter((item) => item.visible !== false)
                          .map((item) => (
                            <span
                              key={item.id}
                              className="text-neutral-700 hover:text-[#7C3AED] font-medium"
                            >
                              {item.label}
                            </span>
                          ))}
                      </div>
                    </div>

                    {/* Menu Item List */}
                    <div className="space-y-2">
                      {(formData.navItems || [
                        { id: 'home', label: 'HOME', visible: true },
                        { id: 'profile', label: 'PROFILE', visible: true },
                        { id: 'career', label: 'CAREER', visible: true },
                        { id: 'projects', label: 'PROJECTS', visible: true },
                        { id: 'awards', label: 'AWARDS', visible: true },
                        { id: 'contact', label: 'CONTACT', visible: true },
                      ]).map((item, idx, arr) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-2 sm:gap-3 p-2.5 bg-white border border-black/10 text-xs font-mono"
                        >
                          <span className="w-6 text-neutral-400 text-center font-bold">
                            {idx + 1}
                          </span>

                          {/* Menu Label Input */}
                          <div className="flex-1">
                            <input
                              type="text"
                              value={item.label}
                              onChange={(e) => {
                                const newItems = [...arr];
                                newItems[idx] = { ...item, label: e.target.value };
                                setFormData({ ...formData, navItems: newItems });
                              }}
                              placeholder="메뉴 명칭"
                              className="w-full px-3 py-1.5 border border-black/20 text-xs font-mono font-bold text-black focus:border-[#7C3AED] focus:outline-hidden uppercase"
                            />
                          </div>

                          {/* Target Section ID */}
                          <div className="w-28 hidden sm:block">
                            <input
                              type="text"
                              value={item.id}
                              onChange={(e) => {
                                const newItems = [...arr];
                                newItems[idx] = { ...item, id: e.target.value };
                                setFormData({ ...formData, navItems: newItems });
                              }}
                              placeholder="연결 ID"
                              className="w-full px-2 py-1.5 border border-black/20 text-[11px] font-mono text-neutral-500"
                            />
                          </div>

                          {/* Visibility Toggle */}
                          <button
                            type="button"
                            onClick={() => {
                              const newItems = [...arr];
                              newItems[idx] = {
                                ...item,
                                visible: item.visible === false ? true : false,
                              };
                              setFormData({ ...formData, navItems: newItems });
                            }}
                            className={`px-2.5 py-1.5 border flex items-center gap-1 text-[11px] font-mono transition-colors ${
                              item.visible !== false
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                                : 'bg-neutral-100 border-neutral-300 text-neutral-400'
                            }`}
                            title={item.visible !== false ? '메뉴 표시 중' : '메뉴 숨김'}
                          >
                            {item.visible !== false ? (
                              <>
                                <Eye className="w-3.5 h-3.5 text-emerald-600" />
                                <span>표시</span>
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3.5 h-3.5 text-neutral-400" />
                                <span>숨김</span>
                              </>
                            )}
                          </button>

                          {/* Reorder Buttons */}
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => {
                                if (idx === 0) return;
                                const newItems = [...arr];
                                const temp = newItems[idx - 1];
                                newItems[idx - 1] = newItems[idx];
                                newItems[idx] = temp;
                                setFormData({ ...formData, navItems: newItems });
                              }}
                              className="p-1.5 border border-black/15 hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none"
                              title="위로 이동"
                            >
                              <MoveUp className="w-3.5 h-3.5 text-neutral-700" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === arr.length - 1}
                              onClick={() => {
                                if (idx === arr.length - 1) return;
                                const newItems = [...arr];
                                const temp = newItems[idx + 1];
                                newItems[idx + 1] = newItems[idx];
                                newItems[idx] = temp;
                                setFormData({ ...formData, navItems: newItems });
                              }}
                              className="p-1.5 border border-black/15 hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none"
                              title="아래로 이동"
                            >
                              <MoveDown className="w-3.5 h-3.5 text-neutral-700" />
                            </button>
                          </div>

                          {/* Delete Item */}
                          {arr.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const newItems = arr.filter((_, i) => i !== idx);
                                setFormData({ ...formData, navItems: newItems });
                              }}
                              className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="메뉴 삭제"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <p className="mt-4 text-[11px] font-mono text-neutral-500">
                      * 메뉴 이름을 바꾼 후 상단의 <strong>[저장하기 (SAVE)]</strong>를 누르면 전체 사이트에 즉시 반영됩니다.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 1: PROFILE */}
              {activeTab === 'profile' && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1">
                      섹션 소제목 (Subtitle)
                    </label>
                    <input
                      type="text"
                      value={formData.profile.subtitle}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          profile: { ...formData.profile, subtitle: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-black/20 text-sm focus:border-[#7C3AED] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1">
                      소개 문구 / 철학 (Introduction)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.profile.introduction}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          profile: { ...formData.profile, introduction: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-black/20 text-sm focus:border-[#7C3AED] focus:outline-hidden leading-relaxed"
                    />
                  </div>

                  {/* Ask Steps */}
                  <div className="pt-4 border-t border-black/10">
                    <h4 className="text-xs font-mono font-bold text-black uppercase mb-3">
                      질문하는 방식 (3-Stage Steps)
                    </h4>
                    <div className="space-y-4">
                      {formData.profile.askSteps.map((step, idx) => (
                        <div key={idx} className="p-4 bg-white border border-black/10 flex gap-4">
                          <span className="font-mono text-sm font-bold text-[#7C3AED]">
                            {step.step}
                          </span>
                          <div className="flex-1 space-y-2">
                            <input
                              type="text"
                              value={step.title}
                              onChange={(e) => {
                                const newSteps = [...formData.profile.askSteps];
                                newSteps[idx].title = e.target.value;
                                setFormData({
                                  ...formData,
                                  profile: { ...formData.profile, askSteps: newSteps },
                                });
                              }}
                              className="w-full px-2 py-1 border border-black/10 text-xs font-bold"
                            />
                            <textarea
                              rows={2}
                              value={step.desc}
                              onChange={(e) => {
                                const newSteps = [...formData.profile.askSteps];
                                newSteps[idx].desc = e.target.value;
                                setFormData({
                                  ...formData,
                                  profile: { ...formData.profile, askSteps: newSteps },
                                });
                              }}
                              className="w-full px-2 py-1 border border-black/10 text-xs text-neutral-600"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div className="pt-4 border-t border-black/10">
                    <h4 className="text-xs font-mono font-bold text-black uppercase mb-3">
                      학력 (Education)
                    </h4>
                    <div className="space-y-3">
                      {formData.profile.educations.map((edu, idx) => (
                        <div key={idx} className="p-3 bg-white border border-black/10 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                          <input
                            type="text"
                            value={edu.school}
                            onChange={(e) => {
                              const newEdus = [...formData.profile.educations];
                              newEdus[idx].school = e.target.value;
                              setFormData({
                                ...formData,
                                profile: { ...formData.profile, educations: newEdus },
                              });
                            }}
                            className="px-2 py-1 border border-black/10 font-bold"
                            placeholder="학교명"
                          />
                          <input
                            type="text"
                            value={edu.major}
                            onChange={(e) => {
                              const newEdus = [...formData.profile.educations];
                              newEdus[idx].major = e.target.value;
                              setFormData({
                                ...formData,
                                profile: { ...formData.profile, educations: newEdus },
                              });
                            }}
                            className="px-2 py-1 border border-black/10"
                            placeholder="전공/신분"
                          />
                          <input
                            type="text"
                            value={edu.period}
                            onChange={(e) => {
                              const newEdus = [...formData.profile.educations];
                              newEdus[idx].period = e.target.value;
                              setFormData({
                                ...formData,
                                profile: { ...formData.profile, educations: newEdus },
                              });
                            }}
                            className="px-2 py-1 border border-black/10 font-mono text-[#7C3AED]"
                            placeholder="기간"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Core Capabilities (핵심 역량 수정/추가) */}
                  <div className="pt-4 border-t border-black/10">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-xs font-mono font-bold text-black uppercase">
                          핵심 역량 관리 (Core Capabilities)
                        </h4>
                        <p className="text-[11px] text-neutral-500 font-mono">
                          PROFILE 페이지의 CORE CAPABILITIES 영역에 표시되는 핵심 역량을 추가/수정합니다.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const currentCaps = formData.profile.coreCapabilities
                            ? [...formData.profile.coreCapabilities]
                            : [
                                { title: 'Problem Framing', desc: '데이터와 현상 뒤에 숨겨진 진짜 소비자 문제와 결핍을 질문으로 재정의' },
                                { title: 'Creative Strategy', desc: '글로벌 광고제 수상으로 입증된 역발상 캠페인 콘셉트 및 메시지 설계' },
                                { title: 'Channel Operation', desc: 'F1 숏폼 채널 140만 뷰, 1.5만 팔로워를 견인한 오가닉 소셜 성장 전략' },
                                { title: 'Global Communication', desc: '프랑스 비즈니스 스쿨 교환학생 및 영문 프레젠테이션/리포트 작성 역량' },
                              ];
                          currentCaps.push({
                            id: `cap-${Date.now()}`,
                            title: 'New Capability',
                            desc: '새로운 역량에 대한 구체적인 설명을 입력하세요.',
                          });
                          setFormData({
                            ...formData,
                            profile: { ...formData.profile, coreCapabilities: currentCaps },
                          });
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#7C3AED] text-white text-xs font-mono font-bold hover:bg-[#6D28D9] transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>역량 추가</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {(formData.profile.coreCapabilities || [
                        { id: 'cap-1', title: 'Problem Framing', desc: '데이터와 현상 뒤에 숨겨진 진짜 소비자 문제와 결핍을 질문으로 재정의' },
                        { id: 'cap-2', title: 'Creative Strategy', desc: '글로벌 광고제 수상으로 입증된 역발상 캠페인 콘셉트 및 메시지 설계' },
                        { id: 'cap-3', title: 'Channel Operation', desc: 'F1 숏폼 채널 140만 뷰, 1.5만 팔로워를 견인한 오가닉 소셜 성장 전략' },
                        { id: 'cap-4', title: 'Global Communication', desc: '프랑스 비즈니스 스쿨 교환학생 및 영문 프레젠테이션/리포트 작성 역량' },
                      ]).map((cap, capIdx) => (
                        <div key={cap.id || capIdx} className="p-3.5 bg-white border border-black/10 space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-mono font-bold text-[#7C3AED]">
                              역량 0{capIdx + 1}
                            </span>
                            <input
                              type="text"
                              value={cap.title}
                              onChange={(e) => {
                                const currentCaps = formData.profile.coreCapabilities
                                  ? [...formData.profile.coreCapabilities]
                                  : [
                                      { title: 'Problem Framing', desc: '데이터와 현상 뒤에 숨겨진 진짜 소비자 문제와 결핍을 질문으로 재정의' },
                                      { title: 'Creative Strategy', desc: '글로벌 광고제 수상으로 입증된 역발상 캠페인 콘셉트 및 메시지 설계' },
                                      { title: 'Channel Operation', desc: 'F1 숏폼 채널 140만 뷰, 1.5만 팔로워를 견인한 오가닉 소셜 성장 전략' },
                                      { title: 'Global Communication', desc: '프랑스 비즈니스 스쿨 교환학생 및 영문 프레젠테이션/리포트 작성 역량' },
                                    ];
                                currentCaps[capIdx] = { ...currentCaps[capIdx], title: e.target.value };
                                setFormData({
                                  ...formData,
                                  profile: { ...formData.profile, coreCapabilities: currentCaps },
                                });
                              }}
                              className="flex-1 px-2.5 py-1 border border-black/10 text-xs font-bold"
                              placeholder="역량 명칭 (예: Creative Strategy)"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const currentCaps = formData.profile.coreCapabilities
                                  ? [...formData.profile.coreCapabilities]
                                  : [
                                      { title: 'Problem Framing', desc: '데이터와 현상 뒤에 숨겨진 진짜 소비자 문제와 결핍을 질문으로 재정의' },
                                      { title: 'Creative Strategy', desc: '글로벌 광고제 수상으로 입증된 역발상 캠페인 콘셉트 및 메시지 설계' },
                                      { title: 'Channel Operation', desc: 'F1 숏폼 채널 140만 뷰, 1.5만 팔로워를 견인한 오가닉 소셜 성장 전략' },
                                      { title: 'Global Communication', desc: '프랑스 비즈니스 스쿨 교환학생 및 영문 프레젠테이션/리포트 작성 역량' },
                                    ];
                                const filtered = currentCaps.filter((_, i) => i !== capIdx);
                                setFormData({
                                  ...formData,
                                  profile: { ...formData.profile, coreCapabilities: filtered },
                                });
                              }}
                              className="text-neutral-400 hover:text-red-600 p-1 transition-colors"
                              title="역량 삭제"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <textarea
                            rows={2}
                            value={cap.desc}
                            onChange={(e) => {
                              const currentCaps = formData.profile.coreCapabilities
                                ? [...formData.profile.coreCapabilities]
                                : [
                                    { title: 'Problem Framing', desc: '데이터와 현상 뒤에 숨겨진 진짜 소비자 문제와 결핍을 질문으로 재정의' },
                                    { title: 'Creative Strategy', desc: '글로벌 광고제 수상으로 입증된 역발상 캠페인 콘셉트 및 메시지 설계' },
                                    { title: 'Channel Operation', desc: 'F1 숏폼 채널 140만 뷰, 1.5만 팔로워를 견인한 오가닉 소셜 성장 전략' },
                                    { title: 'Global Communication', desc: '프랑스 비즈니스 스쿨 교환학생 및 영문 프레젠테이션/리포트 작성 역량' },
                                  ];
                              currentCaps[capIdx] = { ...currentCaps[capIdx], desc: e.target.value };
                              setFormData({
                                ...formData,
                                profile: { ...formData.profile, coreCapabilities: currentCaps },
                              });
                            }}
                            className="w-full px-2.5 py-1.5 border border-black/10 text-xs text-neutral-700 leading-relaxed"
                            placeholder="역량에 대한 설명"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: CAREER */}
              {activeTab === 'career' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono font-bold uppercase text-black">
                      공식 인턴십 경력 리스트 (최신순)
                    </h3>
                    <button
                      onClick={() => {
                        const newCareer: CareerItem = {
                          id: `career-${Date.now()}`,
                          company: '회사명 입력',
                          teamRole: '직무/인턴',
                          period: '2024.01 – 2024.06',
                          bulletPoints: ['담당 업무 1', '담당 업무 2'],
                        };
                        setFormData({
                          ...formData,
                          careers: [newCareer, ...formData.careers],
                        });
                      }}
                      className="inline-flex items-center gap-1 text-xs font-mono text-[#7C3AED] font-bold"
                    >
                      <Plus className="w-3.5 h-3.5" /> 경력 추가
                    </button>
                  </div>

                  {formData.careers.map((career, cIdx) => (
                    <div key={career.id} className="p-5 bg-white border border-black/15 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
                          <input
                            type="text"
                            value={career.company}
                            onChange={(e) => {
                              const newCareers = [...formData.careers];
                              newCareers[cIdx].company = e.target.value;
                              setFormData({ ...formData, careers: newCareers });
                            }}
                            className="px-3 py-1.5 border border-black/20 text-sm font-bold"
                            placeholder="회사명"
                          />
                          <input
                            type="text"
                            value={career.teamRole}
                            onChange={(e) => {
                              const newCareers = [...formData.careers];
                              newCareers[cIdx].teamRole = e.target.value;
                              setFormData({ ...formData, careers: newCareers });
                            }}
                            className="px-3 py-1.5 border border-black/20 text-xs font-mono text-[#7C3AED]"
                            placeholder="팀 및 직무"
                          />
                          <input
                            type="text"
                            value={career.period}
                            onChange={(e) => {
                              const newCareers = [...formData.careers];
                              newCareers[cIdx].period = e.target.value;
                              setFormData({ ...formData, careers: newCareers });
                            }}
                            className="px-3 py-1.5 border border-black/20 text-xs font-mono"
                            placeholder="근무 기간"
                          />
                        </div>
                        <button
                          onClick={() => {
                            const newCareers = formData.careers.filter((_, i) => i !== cIdx);
                            setFormData({ ...formData, careers: newCareers });
                          }}
                          className="text-neutral-400 hover:text-red-600 p-1"
                          title="삭제"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Bullet points */}
                      <div>
                        <label className="block text-[11px] font-mono text-neutral-500 mb-1">
                          상세 업무 (줄바꿈으로 구분)
                        </label>
                        <textarea
                          rows={3}
                          value={career.bulletPoints.join('\n')}
                          onChange={(e) => {
                            const newCareers = [...formData.careers];
                            newCareers[cIdx].bulletPoints = e.target.value
                              .split('\n')
                              .filter((l) => l.trim() !== '');
                            setFormData({ ...formData, careers: newCareers });
                          }}
                          className="w-full px-3 py-2 border border-black/10 text-xs text-neutral-700"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: F1 CHANNEL */}
              {activeTab === 'f1' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-neutral-700 mb-1">
                        프로젝트 타이틀
                      </label>
                      <input
                        type="text"
                        value={formData.f1Project.title}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            f1Project: { ...formData.f1Project, title: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-black/20 text-sm font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-neutral-700 mb-1">
                        서브타이틀
                      </label>
                      <input
                        type="text"
                        value={formData.f1Project.subtitle}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            f1Project: { ...formData.f1Project, subtitle: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-black/20 text-sm"
                      />
                    </div>
                  </div>

                  {/* Media Uploaders for F1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-neutral-50 p-4 border border-black/10">
                    <div>
                      <MediaUploader
                        label="레일 썸네일 이미지/영상 (Thumbnail)"
                        value={formData.f1Project.imageUrl || ''}
                        onChange={(url) =>
                          setFormData({
                            ...formData,
                            f1Project: { ...formData.f1Project, imageUrl: url },
                          })
                        }
                        helperText="내 컴퓨터의 사진/영상 또는 웹 링크"
                      />
                    </div>
                    <div>
                      <MediaUploader
                        label="아이폰 목업 내부 화면 (Phone Mockup Media)"
                        value={formData.f1Project.mockupMediaUrl || ''}
                        onChange={(url) =>
                          setFormData({
                            ...formData,
                            f1Project: { ...formData.f1Project, mockupMediaUrl: url },
                          })
                        }
                        helperText="아이폰 화면 속에 들어갈 내 컴퓨터의 사진 또는 영상"
                      />
                    </div>
                  </div>

                  {/* F1 Social Metrics */}
                  <div className="bg-white p-4 border border-black/10 space-y-3">
                    <label className="block text-xs font-mono font-bold text-neutral-800">
                      인스타그램 지표 (Instagram Metrics)
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-neutral-500 mb-1">
                          Followers
                        </label>
                        <input
                          type="text"
                          value={formData.f1Project.followers || ''}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              f1Project: { ...formData.f1Project, followers: e.target.value },
                            })
                          }
                          placeholder="15,000+"
                          className="w-full px-2.5 py-1.5 border border-black/20 text-xs font-mono font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-neutral-500 mb-1">
                          Views
                        </label>
                        <input
                          type="text"
                          value={formData.f1Project.views || ''}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              f1Project: { ...formData.f1Project, views: e.target.value },
                            })
                          }
                          placeholder="1.4M+"
                          className="w-full px-2.5 py-1.5 border border-black/20 text-xs font-mono font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-neutral-500 mb-1">
                          Interactions
                        </label>
                        <input
                          type="text"
                          value={formData.f1Project.interactions || ''}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              f1Project: { ...formData.f1Project, interactions: e.target.value },
                            })
                          }
                          placeholder="8.4%"
                          className="w-full px-2.5 py-1.5 border border-black/20 text-xs font-mono font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-[#7C3AED] mb-1">
                        01. 기획 배경 (WHY)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.f1Project.why}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            f1Project: { ...formData.f1Project, why: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-black/20 text-xs leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-[#7C3AED] mb-1">
                        02. 운영 전략 (STRATEGY)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.f1Project.strategy}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            f1Project: { ...formData.f1Project, strategy: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-black/20 text-xs leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-[#7C3AED] mb-1">
                        03. 콘텐츠 실행 &amp; 운영 방식 (EXECUTION)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.f1Project.execution}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            f1Project: { ...formData.f1Project, execution: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-black/20 text-xs leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-black mb-1">
                        본인 담당 역할 (ROLE)
                      </label>
                      <input
                        type="text"
                        value={formData.f1Project.role}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            f1Project: { ...formData.f1Project, role: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-black/20 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-emerald-700 mb-1">
                        04. 실질 성과 (OUTCOME)
                      </label>
                      <textarea
                        rows={2}
                        value={formData.f1Project.results}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            f1Project: { ...formData.f1Project, results: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-black/20 text-xs leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: CAMPAIGNS */}
              {activeTab === 'campaigns' && (
                <div className="space-y-8 max-w-4xl">
                  {/* Top Bar for Adding Project */}
                  <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white border border-black/10">
                    <div>
                      <h3 className="text-sm font-mono font-bold uppercase text-black">
                        프로젝트 관리 ({formData.campaigns.length}건)
                      </h3>
                      <p className="text-xs text-neutral-500 font-mono mt-0.5">
                        프로젝트를 자유롭게 추가하거나 삭제하고, 사진/영상 및 어워드 수상 내역을 수정할 수 있습니다.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newId = `camp-${Date.now()}`;
                        const newCampaign: CampaignProject = {
                          id: newId,
                          order: formData.campaigns.length + 1,
                          title: '새로운 프로젝트',
                          client: 'BRAND NAME',
                          year: new Date().getFullYear().toString(),
                          category: 'Campaign',
                          summary: '프로젝트 요약 설명',
                          question: '해결해야 했던 문제',
                          insight: '발견한 핵심 인사이트',
                          answer: '캠페인 아이디어와 솔루션',
                          myRole: '기획 및 전략 총괄',
                          result: '수상 또는 성과',
                          awardBadges: [],
                          awardBadge: '',
                          imageUrl: '',
                          mediaUrl: '',
                        };
                        setFormData({
                          ...formData,
                          campaigns: [newCampaign, ...formData.campaigns],
                        });
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#7C3AED] text-white text-xs font-mono font-bold hover:bg-[#6D28D9] transition-colors shadow-xs cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>새 프로젝트 추가</span>
                    </button>
                  </div>

                  {formData.campaigns.map((camp, cIdx) => (
                    <div key={camp.id} className="p-6 bg-white border border-black/15 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold text-[#7C3AED]">
                            대표 프로젝트 0{cIdx + 1}
                          </span>
                          <span className="text-xs font-mono text-neutral-400">
                            ID: {camp.id}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`'${camp.title}' 프로젝트를 삭제하시겠습니까?`)) {
                              const newCamps = formData.campaigns.filter((_, i) => i !== cIdx);
                              setFormData({ ...formData, campaigns: newCamps });
                            }
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
                          title="프로젝트 삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>프로젝트 삭제</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          value={camp.title}
                          onChange={(e) => {
                            const newCamps = [...formData.campaigns];
                            newCamps[cIdx].title = e.target.value;
                            setFormData({ ...formData, campaigns: newCamps });
                          }}
                          className="px-3 py-1.5 border border-black/20 text-sm font-bold col-span-2"
                          placeholder="캠페인 타이틀"
                        />
                        <input
                          type="text"
                          value={camp.client}
                          onChange={(e) => {
                            const newCamps = [...formData.campaigns];
                            newCamps[cIdx].client = e.target.value;
                            setFormData({ ...formData, campaigns: newCamps });
                          }}
                          className="px-3 py-1.5 border border-black/20 text-xs"
                          placeholder="클라이언트/브랜드"
                        />
                      </div>

                      {/* Awards Badge Manager (브랜드-캠페인명 아래 어워드 추가/변경) */}
                      <div className="bg-[#7C3AED]/5 border border-[#7C3AED]/25 p-3.5 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#7C3AED]">
                            <Award className="w-3.5 h-3.5" />
                            <span>어워드 수상 내역 (Awards Badges)</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const newCamps = [...formData.campaigns];
                              const currentAwards = newCamps[cIdx].awardBadges
                                ? [...newCamps[cIdx].awardBadges!]
                                : newCamps[cIdx].awardBadge
                                ? [newCamps[cIdx].awardBadge!]
                                : [];
                              currentAwards.push('');
                              newCamps[cIdx].awardBadges = currentAwards;
                              newCamps[cIdx].awardBadge = currentAwards.find((a) => a.trim()) || '';
                              setFormData({ ...formData, campaigns: newCamps });
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#7C3AED] text-white text-[11px] font-mono hover:bg-[#6D28D9] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                            <span>어워드 추가</span>
                          </button>
                        </div>

                        {(() => {
                          const awards =
                            camp.awardBadges && camp.awardBadges.length > 0
                              ? camp.awardBadges
                              : camp.awardBadge
                              ? [camp.awardBadge]
                              : [];

                          if (awards.length === 0) {
                            return (
                              <p className="text-[11px] text-neutral-400 font-mono italic">
                                등록된 어워드가 없습니다. '+ 어워드 추가'를 눌러 추가해보세요.
                              </p>
                            );
                          }

                          return (
                            <div className="space-y-2">
                              {awards.map((badge, bIdx) => (
                                <div key={bIdx} className="flex items-center gap-2">
                                  <div className="inline-flex items-center px-2 py-1 bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/30 text-xs font-mono shrink-0">
                                    <Award className="w-3 h-3 mr-1" />
                                    <span>#{bIdx + 1}</span>
                                  </div>
                                  <input
                                    type="text"
                                    value={badge}
                                    onChange={(e) => {
                                      const newCamps = [...formData.campaigns];
                                      const currentAwards = newCamps[cIdx].awardBadges
                                        ? [...newCamps[cIdx].awardBadges!]
                                        : newCamps[cIdx].awardBadge
                                        ? [newCamps[cIdx].awardBadge!]
                                        : [];
                                      currentAwards[bIdx] = e.target.value;
                                      newCamps[cIdx].awardBadges = currentAwards;
                                      newCamps[cIdx].awardBadge = currentAwards.find((a) => a.trim()) || '';
                                      setFormData({ ...formData, campaigns: newCamps });
                                    }}
                                    placeholder="어워드 명칭 (예: ANDY Awards Gold)"
                                    className="flex-1 px-2.5 py-1.5 border border-black/20 text-xs font-mono text-[#7C3AED] bg-white font-medium"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newCamps = [...formData.campaigns];
                                      const currentAwards = newCamps[cIdx].awardBadges
                                        ? [...newCamps[cIdx].awardBadges!]
                                        : newCamps[cIdx].awardBadge
                                        ? [newCamps[cIdx].awardBadge!]
                                        : [];
                                      currentAwards.splice(bIdx, 1);
                                      newCamps[cIdx].awardBadges = currentAwards;
                                      newCamps[cIdx].awardBadge = currentAwards.find((a) => a.trim()) || '';
                                      setFormData({ ...formData, campaigns: newCamps });
                                    }}
                                    className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                    title="어워드 삭제"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          );
                        })()}
                      </div>

                      {/* Campaign Media Uploaders */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-neutral-50 p-3 border border-black/10">
                        <div>
                          <MediaUploader
                            label="프로젝트 썸네일 (Thumbnail Media)"
                            value={camp.imageUrl || ''}
                            onChange={(url) => {
                              const newCamps = [...formData.campaigns];
                              newCamps[cIdx].imageUrl = url;
                              setFormData({ ...formData, campaigns: newCamps });
                            }}
                            helperText="가로 레일에 표시될 내 컴퓨터 사진/영상 또는 링크"
                          />
                        </div>
                        <div>
                          <MediaUploader
                            label="본문 상단 미디어 (Above Question/Answer Media)"
                            value={camp.mediaUrl || camp.imageUrl || ''}
                            onChange={(url) => {
                              const newCamps = [...formData.campaigns];
                              newCamps[cIdx].mediaUrl = url;
                              setFormData({ ...formData, campaigns: newCamps });
                            }}
                            helperText="Question/Insight/Answer 위에 크게 나올 사진/동영상"
                          />
                        </div>
                      </div>

                      {/* 5-Stage Core Fields */}
                      <div className="space-y-3 pt-2">
                        <div>
                          <label className="block text-xs font-mono font-bold text-[#7C3AED] mb-1">
                            QUESTION
                          </label>
                          <textarea
                            rows={2}
                            value={camp.question}
                            onChange={(e) => {
                              const newCamps = [...formData.campaigns];
                              newCamps[cIdx].question = e.target.value;
                              setFormData({ ...formData, campaigns: newCamps });
                            }}
                            className="w-full px-3 py-1.5 border border-black/20 text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono font-bold text-neutral-700 mb-1">
                            INSIGHT
                          </label>
                          <textarea
                            rows={2}
                            value={camp.insight}
                            onChange={(e) => {
                              const newCamps = [...formData.campaigns];
                              newCamps[cIdx].insight = e.target.value;
                              setFormData({ ...formData, campaigns: newCamps });
                            }}
                            className="w-full px-3 py-1.5 border border-black/20 text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono font-bold text-[#7C3AED] mb-1">
                            ANSWER
                          </label>
                          <textarea
                            rows={2}
                            value={camp.answer}
                            onChange={(e) => {
                              const newCamps = [...formData.campaigns];
                              newCamps[cIdx].answer = e.target.value;
                              setFormData({ ...formData, campaigns: newCamps });
                            }}
                            className="w-full px-3 py-1.5 border border-black/20 text-xs"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-mono font-bold text-neutral-700 mb-1">
                              MY ROLE
                            </label>
                            <textarea
                              rows={2}
                              value={camp.myRole}
                              onChange={(e) => {
                                const newCamps = [...formData.campaigns];
                                newCamps[cIdx].myRole = e.target.value;
                                setFormData({ ...formData, campaigns: newCamps });
                              }}
                              className="w-full px-3 py-1.5 border border-black/20 text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono font-bold text-neutral-700 mb-1">
                              RESULT
                            </label>
                            <textarea
                              rows={2}
                              value={camp.result}
                              onChange={(e) => {
                                const newCamps = [...formData.campaigns];
                                newCamps[cIdx].result = e.target.value;
                                setFormData({ ...formData, campaigns: newCamps });
                              }}
                              className="w-full px-3 py-1.5 border border-black/20 text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 5: MORE PROJECTS */}
              {activeTab === 'more' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono font-bold uppercase text-black">
                      MORE PROJECTS 아카이브 리스트
                    </h3>
                    <button
                      onClick={() => {
                        const newProj: MoreProjectItem = {
                          id: `more-${Date.now()}`,
                          title: '새 프로젝트 명',
                          category: 'Branding / Campaign',
                          question: '해결하려 한 질문은 무엇인가?',
                          insight: '발견한 핵심 인사이트',
                          answer: '실행한 솔루션과 캠페인',
                          myRole: '담당 업무',
                          result: '수상 또는 성과',
                        };
                        setFormData({
                          ...formData,
                          moreProjects: [...formData.moreProjects, newProj],
                        });
                      }}
                      className="inline-flex items-center gap-1 text-xs font-mono text-[#7C3AED] font-bold"
                    >
                      <Plus className="w-3.5 h-3.5" /> 프로젝트 추가
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formData.moreProjects.map((proj, pIdx) => (
                      <div key={proj.id} className="p-4 bg-white border border-black/10 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 flex-1">
                            <input
                              type="text"
                              value={proj.title}
                              onChange={(e) => {
                                const newProjs = [...formData.moreProjects];
                                newProjs[pIdx].title = e.target.value;
                                setFormData({ ...formData, moreProjects: newProjs });
                              }}
                              className="px-2 py-1 border border-black/20 text-xs font-bold w-48"
                              placeholder="프로젝트명"
                            />
                            <input
                              type="text"
                              value={proj.category}
                              onChange={(e) => {
                                const newProjs = [...formData.moreProjects];
                                newProjs[pIdx].category = e.target.value;
                                setFormData({ ...formData, moreProjects: newProjs });
                              }}
                              className="px-2 py-1 border border-black/10 text-[11px] font-mono text-neutral-600 w-36"
                              placeholder="카테고리"
                            />
                            <input
                              type="text"
                              value={proj.award || ''}
                              onChange={(e) => {
                                const newProjs = [...formData.moreProjects];
                                newProjs[pIdx].award = e.target.value;
                                setFormData({ ...formData, moreProjects: newProjs });
                              }}
                              className="px-2 py-1 border border-black/10 text-[11px] font-mono text-[#7C3AED] flex-1"
                              placeholder="수상/비고"
                            />
                          </div>
                          <button
                            onClick={() => {
                              const newProjs = formData.moreProjects.filter((_, i) => i !== pIdx);
                              setFormData({ ...formData, moreProjects: newProjs });
                            }}
                            className="text-neutral-400 hover:text-red-600 p-1 ml-2"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="pt-2 border-t border-black/5 space-y-2">
                          <MediaUploader
                            label="프로젝트 미디어 (썸네일/상단)"
                            value={proj.imageUrl || ''}
                            onChange={(url) => {
                              const newProjs = [...formData.moreProjects];
                              newProjs[pIdx].imageUrl = url;
                              newProjs[pIdx].mediaUrl = url;
                              setFormData({ ...formData, moreProjects: newProjs });
                            }}
                            helperText="내 컴퓨터 파일 또는 웹 링크"
                          />
                          <input
                            type="text"
                            value={proj.question}
                            onChange={(e) => {
                              const newProjs = [...formData.moreProjects];
                              newProjs[pIdx].question = e.target.value;
                              setFormData({ ...formData, moreProjects: newProjs });
                            }}
                            className="w-full px-2 py-1 border border-black/10 text-xs text-neutral-700"
                            placeholder="Question"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: AWARDS */}
              {activeTab === 'awards' && (
                <div className="space-y-6 max-w-4xl">
                  {/* Top Bar for Awards */}
                  <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white border border-black/10">
                    <div>
                      <h3 className="text-sm font-mono font-bold uppercase text-black">
                        공식 수상 및 파이널리스트 이력 ({formData.awards.length}건)
                      </h3>
                      <p className="text-xs text-neutral-500 font-mono mt-0.5">
                        AWARDS 페이지의 Recognition Archive 테이블에 실시간 반영됩니다.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newAward: AwardItem = {
                          id: `aw-${Date.now()}`,
                          year: new Date().getFullYear().toString(),
                          festival: '신규 광고제/공모전명',
                          tier: 'Gold',
                          projectName: '프로젝트명',
                          type: 'international',
                        };
                        setFormData({
                          ...formData,
                          awards: [newAward, ...formData.awards],
                        });
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#7C3AED] text-white text-xs font-mono font-bold hover:bg-[#6D28D9] transition-colors shadow-xs cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>수상 기록 추가</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.awards.map((aw, aIdx) => (
                      <div
                        key={aw.id}
                        className="p-3.5 bg-white border border-black/10 space-y-2.5"
                      >
                        <div className="flex items-center justify-between border-b border-black/5 pb-2">
                          <span className="text-[11px] font-mono font-bold text-[#7C3AED]">
                            0{aIdx + 1}. {aw.festival || '광고제명 미입력'}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const newAws = formData.awards.filter((_, i) => i !== aIdx);
                              setFormData({ ...formData, awards: newAws });
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-mono text-neutral-400 hover:text-red-600 transition-colors"
                            title="수상 내역 삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>삭제</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-12 gap-2 text-xs">
                          <div className="col-span-1 sm:col-span-2">
                            <label className="block text-[10px] font-mono text-neutral-500 mb-0.5">연도</label>
                            <input
                              type="text"
                              value={aw.year}
                              onChange={(e) => {
                                const newAws = [...formData.awards];
                                newAws[aIdx].year = e.target.value;
                                setFormData({ ...formData, awards: newAws });
                              }}
                              className="w-full px-2.5 py-1.5 border border-black/10 font-mono text-center"
                              placeholder="2025"
                            />
                          </div>
                          <div className="col-span-1 sm:col-span-3">
                            <label className="block text-[10px] font-mono text-neutral-500 mb-0.5">광고제/공모전명</label>
                            <input
                              type="text"
                              value={aw.festival}
                              onChange={(e) => {
                                const newAws = [...formData.awards];
                                newAws[aIdx].festival = e.target.value;
                                setFormData({ ...formData, awards: newAws });
                              }}
                              className="w-full px-2.5 py-1.5 border border-black/10 font-bold text-black"
                              placeholder="광고제명"
                            />
                          </div>
                          <div className="col-span-1 sm:col-span-2">
                            <label className="block text-[10px] font-mono text-neutral-500 mb-0.5">수상 등급</label>
                            <input
                              type="text"
                              value={aw.tier}
                              onChange={(e) => {
                                const newAws = [...formData.awards];
                                newAws[aIdx].tier = e.target.value;
                                setFormData({ ...formData, awards: newAws });
                              }}
                              className="w-full px-2.5 py-1.5 border border-black/10 font-mono text-[#7C3AED] font-semibold"
                              placeholder="Gold / Finalist"
                            />
                          </div>
                          <div className="col-span-1 sm:col-span-3">
                            <label className="block text-[10px] font-mono text-neutral-500 mb-0.5">출품 프로젝트명</label>
                            <input
                              type="text"
                              value={aw.projectName}
                              onChange={(e) => {
                                const newAws = [...formData.awards];
                                newAws[aIdx].projectName = e.target.value;
                                setFormData({ ...formData, awards: newAws });
                              }}
                              className="w-full px-2.5 py-1.5 border border-black/10 text-neutral-800"
                              placeholder="프로젝트명"
                            />
                          </div>
                          <div className="col-span-2 sm:col-span-2">
                            <label className="block text-[10px] font-mono text-neutral-500 mb-0.5">구분</label>
                            <select
                              value={aw.type}
                              onChange={(e) => {
                                const newAws = [...formData.awards];
                                newAws[aIdx].type = e.target.value as 'international' | 'domestic';
                                setFormData({ ...formData, awards: newAws });
                              }}
                              className="w-full px-2 py-1.5 border border-black/10 font-mono text-xs bg-neutral-50"
                            >
                              <option value="international">국제 (INTL)</option>
                              <option value="domestic">국내 (KOREA)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: CONTACT */}
              {activeTab === 'contact' && (
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <label className="block text-xs font-mono font-bold text-neutral-700 mb-1">
                      마무리 헤드라인
                    </label>
                    <input
                      type="text"
                      value={formData.contact.headline}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact: { ...formData.contact, headline: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-black/20 text-sm font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-neutral-700 mb-1">
                      마무리 서브문구
                    </label>
                    <input
                      type="text"
                      value={formData.contact.subheadline}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact: { ...formData.contact, subheadline: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-black/20 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-neutral-700 mb-1">
                      이메일 주소
                    </label>
                    <input
                      type="email"
                      value={formData.contact.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact: { ...formData.contact, email: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-black/20 text-sm font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-neutral-700 mb-1">
                      LinkedIn 프로필 URL
                    </label>
                    <input
                      type="url"
                      value={formData.contact.linkedin}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact: { ...formData.contact, linkedin: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-black/20 text-sm font-mono"
                    />
                  </div>
                </div>
              )}

              {/* TAB 8: JSON BACKUP */}
              {activeTab === 'json' && (
                <div className="space-y-4 max-w-4xl">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleExportJson}
                      className="px-3 py-1.5 bg-black text-white text-xs font-mono"
                    >
                      현재 데이터 JSON 생성
                    </button>
                    <button
                      onClick={handleImportJson}
                      className="px-3 py-1.5 bg-[#7C3AED] text-white text-xs font-mono"
                    >
                      JSON 데이터로 덮어쓰기
                    </button>
                  </div>
                  <textarea
                    rows={16}
                    value={jsonText}
                    onChange={(e) => setJsonText(e.target.value)}
                    placeholder="포트폴리오 백업 JSON을 여기에 붙여넣거나 생성하세요..."
                    className="w-full px-4 py-3 border border-black/20 font-mono text-xs bg-white text-neutral-800"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
