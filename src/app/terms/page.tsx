import React from 'react';

const TermsPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow rounded-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">이용약관</h1>
                    
                    <div className="space-y-6 text-gray-700">
                        <section>
                            <h2 className="text-xl font-semibold mb-4">1. 서비스 소개</h2>
                            <p className="mb-4">
                                본 서비스는 Google의 Gemini API를 활용하여 AI 기반의 성향 테스트 및 컨텐츠를 제공합니다.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4">2. AI 생성 컨텐츠에 대한 책임</h2>
                            <p className="mb-4">
                                본 서비스에서 제공하는 모든 컨텐츠는 AI에 의해 생성된 것으로, 절대적인 정확성을 보장하지 않습니다. 
                                사용자는 AI가 생성한 결과를 참고용으로만 활용하여야 하며, 이를 근거로 한 어떠한 결정에 대해서도 
                                본 서비스는 책임을 지지 않습니다.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4">3. 서비스 이용 제한</h2>
                            <p className="mb-4">
                                본 서비스는 다음의 행위를 금지합니다:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>서비스를 악의적인 목적으로 이용하는 행위</li>
                                <li>AI 생성 결과를 조작하거나 왜곡하여 사용하는 행위</li>
                                <li>타인의 권리를 침해하거나 법적 문제를 야기할 수 있는 방식으로 서비스를 이용하는 행위</li>
                                <li>서비스의 정상적인 운영을 방해하는 행위</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4">4. 개인정보 보호</h2>
                            <p className="mb-4">
                                본 서비스는 사용자의 개인정보를 보호하기 위해 최선을 다하고 있습니다. 
                                AI 생성 과정에서 수집되는 데이터는 서비스 개선을 위한 목적으로만 사용되며, 
                                제3자와 공유되지 않습니다.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4">5. 서비스 변경 및 중단</h2>
                            <p className="mb-4">
                                본 서비스는 사전 통보 없이 서비스의 내용을 변경하거나 중단할 수 있습니다. 
                                이로 인해 발생하는 불편에 대해서는 책임을 지지 않습니다.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4">6. 기타</h2>
                            <p className="mb-4">
                                본 이용약관은 필요한 경우 수정될 수 있으며, 수정된 약관은 서비스 내에 공지됩니다. 
                                수정된 약관은 공지된 시점부터 효력을 발생합니다.
                            </p>
                        </section>

                        <div className="mt-8 text-sm text-gray-500">
                            <p>최종 수정일: 2025년 5월 1일</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsPage; 