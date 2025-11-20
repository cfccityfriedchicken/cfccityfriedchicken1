import React from 'react';
import { ChefIcon } from './IconComponents';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-brand-dark text-white scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
            <div className="mb-6 bg-brand-primary p-4 rounded-full inline-block shadow-lg ring-4 ring-white/10">
                <ChefIcon className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-2">About CFC</h2>
            <p className="text-gray-400 mb-10 max-w-2xl">Serving happiness since 2010</p>
            
            <div className="w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl border border-gray-700 bg-gray-800">
                <table className="w-full text-left border-collapse">
                    <tbody className="divide-y divide-gray-700">
                        <tr className="hover:bg-gray-700/50 transition-colors">
                            <td className="p-4 sm:p-6 text-gray-300 leading-relaxed text-left border-r border-gray-700" dir="rtl">
                                نیا لاہور سے اُبھرتا ہوا، CFC سٹی فرائیڈ چکن فاسٹ فوڈ کی ذائقہ دار دنیا ہے۔ ہم معیار اور لذت سے بھرپور کھانے کے ذریعے شہر کے زندہ دل ذائقے کو ہر ڈش میں قید کرتے ہیں۔
                            </td>
                            <th className="p-4 sm:p-6 font-bold text-brand-secondary text-lg w-1/3 text-right align-top">تعارف <br/><span className="text-xs text-gray-500 font-normal font-sans uppercase">Introduction</span></th>
                        </tr>
                        <tr className="hover:bg-gray-700/50 transition-colors">
                            <td className="p-4 sm:p-6 text-gray-300 leading-relaxed text-left border-r border-gray-700" dir="rtl">
                                ہمارے بانی شیف نے تازہ مقامی اجزاء اور نسل در نسل خفیہ مصالحوں کے امتزاج سے ہر فاسٹ فوڈ آئٹم کو ایک نیا معیار دیا ہے۔ ہم ذائقے پر سمجھوتہ کیے بغیر تیز ترین سروس فراہم کرنے پر یقین رکھتے ہیں۔
                            </td>
                            <th className="p-4 sm:p-6 font-bold text-brand-secondary text-lg text-right align-top">ہماری پہچان <br/><span className="text-xs text-gray-500 font-normal font-sans uppercase">Our Commitment</span></th>
                        </tr>
                        
                        <tr className="hover:bg-gray-700/50 transition-colors">
                            <td className="p-4 sm:p-6 text-gray-300 leading-relaxed text-left border-r border-gray-700" dir="rtl">
                                وہ معیار اور ذائقہ جو آپ کو ہمارے برگرز، پیزا، اور پاستا میں بھی ملے گا جس پر سی ایف سی فخر کرتا ہے۔
                            </td>
                            <th className="p-4 sm:p-6 font-bold text-brand-secondary text-lg text-right align-top">اہم مصنوعات <br/><span className="text-xs text-gray-500 font-normal font-sans uppercase">Key Products</span></th>
                        </tr>

                        <tr className="hover:bg-gray-700/50 transition-colors">
                            <td className="p-4 sm:p-6 text-gray-300 leading-relaxed text-left border-r border-gray-700" dir="rtl">
                                <ul className="list-disc list-inside space-y-2 text-right pr-2">
                                    <li>برگرز اور سینڈوچز (Burgers & Sandwiches)</li>
                                    <li>پیزا (Pizza)</li>
                                    <li>رائل پریمیم فلیورز پیزا (Royal Premium Flavors Pizza)</li>
                                    <li>کباب سٹاپر (Kabab Stuffer)</li>
                                    <li>پاستا (Pasta)</li>
                                    <li>سٹارٹرز، فرائیڈ اور رولز (Starters, Fried & Rolls)</li>
                                    <li>آئس کریم (Ice Cream)</li>
                                    <li>ڈیلز (Deals)</li>
                                </ul>
                            </td>
                            <th className="p-4 sm:p-6 font-bold text-brand-secondary text-lg text-right align-top">مکمل مینیو <br/><span className="text-xs text-gray-500 font-normal font-sans uppercase">Full Menu</span></th>
                        </tr>

                         <tr className="hover:bg-gray-700/50 transition-colors">
                             <td className="p-4 sm:p-6 text-gray-300 font-bold text-left border-r border-gray-700">
                                <div className="flex flex-col sm:flex-row justify-end gap-4">
                                    <a href="tel:+923000421400" className="hover:text-brand-secondary transition-colors">+92 300 0421400</a>
                                    <span className="hidden sm:inline text-gray-600">|</span>
                                    <a href="tel:+923001314338" className="hover:text-brand-secondary transition-colors">+92 300 1314338</a>
                                </div>
                            </td>
                            <th className="p-4 sm:p-6 font-bold text-brand-secondary text-lg text-right">📞 رابطہ کریں</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
  );
};