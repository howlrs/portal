import { Col, Row, Tabs } from "antd";
import { emailDisplay, setEnvValue } from "../../../common/strconv";
import style from './style.module.css';
import Link from "next/link";
import type { TabsProps } from 'antd';

export default function Page() {
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Specified',
            children: (
                <>
                    <Row className={style.content} gutter={[16, 16]}>
                        <Col span={24}>
                            <h2>特定商取引法に基づく表記</h2>
                            <dl>
                                <dt>販売者名称:</dt>
                                <dd>{setEnvValue(process.env.NEXT_PUBLIC_USERNAME)}</dd>

                                <dt>運営統括責任者:</dt>
                                <dd>{setEnvValue(process.env.NEXT_PUBLIC_USERNAME)}</dd>

                                <dt>所在地:</dt>
                                <dd>{setEnvValue(process.env.NEXT_PUBLIC_ADDRESS)}</dd>

                                <dt>連絡先:</dt>
                                <dd>
                                    <ul>
                                        <li>メールアドレス: {emailDisplay(process.env.NEXT_PUBLIC_EMAIL)}</li>
                                        <li>電話番号: {setEnvValue(process.env.NEXT_PUBLIC_TEL)}</li>
                                    </ul>
                                </dd>

                                <dt>サービスの対価:</dt>
                                <dd>
                                    <dt>
                                        <Link href={setEnvValue(process.env.NEXT_PUBLIC_XAUTO_URL)} title={setEnvValue(process.env.NEXT_PUBLIC_XAUTO_DESCRIPTION)}>
                                            {setEnvValue(process.env.NEXT_PUBLIC_XAUTO_TITLE)}
                                        </Link>
                                    </dt>
                                    <dd>
                                        <ul>
                                            <li>基本サービス: 無料</li>
                                            <li>販売価格: 機能解放 {setEnvValue(process.env.NEXT_PUBLIC_XAUTO_LOWPRICE)}</li>
                                            <li>販売価格: 設定代行 {setEnvValue(process.env.NEXT_PUBLIC_XAUTO_HIGHPRICE)}</li>
                                            <li>その他料金が発生する場合は、各サービスの購入画面にて明示します。</li>
                                        </ul>
                                    </dd>
                                </dd>

                                <dt>追加手数料:</dt>
                                <dd>{setEnvValue(process.env.NEXT_PUBLIC_XAUTO_ADDITIONAL)}</dd>

                                <dt>受付可能な決済手段</dt>
                                <dd>{setEnvValue(process.env.NEXT_PUBLIC_XAUTO_PAYMENT_METHOD)}</dd>

                                <dt>決済期間:</dt>
                                <dd>{setEnvValue(process.env.NEXT_PUBLIC_XAUTO_PAYMENT_PERIOD)}</dd>

                                <dt>引渡し時期:</dt>
                                <dd>{setEnvValue(process.env.NEXT_PUBLIC_XAUTO_DELIVERY_METHOD)}</dd>

                                <dt>返品・キャンセルについて:</dt>
                                <dd>
                                    {setEnvValue(process.env.NEXT_PUBLIC_XAUTO_RETURN_METHOD)}
                                </dd>

                                <dt>動作環境:</dt>
                                <dd>
                                    <ul>
                                        <li>ウェブブラウザ: 最新版のChrome、Safari、Firefoxを推奨</li>
                                        <li>その他: インターネット接続環境が必要です。</li>
                                        <li>対応OS: 最新版の各OS（iOS、Android、Windows、macOS）を推奨</li>
                                    </ul>
                                </dd>

                                <dt>その他:</dt>
                                <dd>
                                    <ul>
                                        <li>サービス内容や価格は予告なく変更する場合があります。</li>
                                    </ul>
                                </dd>

                                <dt>特約事項:</dt>
                                <dd>{setEnvValue(process.env.NEXT_PUBLIC_XAUTO_SPECIAL_TERM)}</dd>
                            </dl>
                        </Col>
                    </Row>
                </>
            ),
        },
        {
            key: '2',
            label: 'Policy&Privacy',
            children: (
                <>
                    <Row className={style.content} gutter={[16, 16]}>
                        <Col span={24}>
                            <div className="terms-of-service">
                                <h2>利用規約</h2>
                                <p>
                                    この利用規約（以下「本規約」といいます）は、{setEnvValue(process.env.NEXT_PUBLIC_USERNAME)}（以下「当プロバイダ」といいます）が提供する{setEnvValue(process.env.NEXT_PUBLIC_XAUTO_TITLE)}（以下「本サービス」といいます）の利用に関する条件を定めるものです。本サービスの利用者は、本規約に同意の上、本サービスをご利用ください。
                                </p>

                                <h3>第1条（適用範囲）</h3>
                                <ol>
                                    <li>本規約は、本サービスの利用に関し、利用者と当プロバイダとの間の一切の関係に適用されます。</li>
                                    <li>当プロバイダが別途定める利用条件、ガイドライン、その他の規約（以下、総称して「個別規約」といいます）は、本規約の一部を構成するものとします。</li>
                                    <li>本規約と個別規約の内容が異なる場合は、個別規約の内容が優先されるものとします。</li>
                                </ol>

                                <h3>第2条（利用登録）</h3>
                                <ol>
                                    <li>本サービスの利用を希望する者は、本規約に同意の上、当プロバイダ所定の方法により利用登録を行うものとします。</li>
                                    <li>当プロバイダは、利用登録を申請した者が以下のいずれかに該当すると判断した場合、利用登録を承認しないことがあります。
                                        <ul>
                                            <li>本規約に違反するおそれがあると当プロバイダが判断した場合</li>
                                            <li>登録内容に虚偽、誤記、または記載漏れがあった場合</li>
                                            <li>その他、当プロバイダが利用登録を不適当と判断した場合</li>
                                        </ul>
                                    </li>
                                    <li>未成年者が本サービスを利用する場合、親権者等の法定代理人の同意を得るものとします。</li>
                                </ol>

                                <h3>第3条（アカウントの管理）</h3>
                                <ol>
                                    <li>利用者は、自己の責任において、本サービスのアカウントを適切に管理するものとします。</li>
                                    <li>利用者は、アカウントを第三者に利用させたり、貸与、譲渡、名義変更、売買等をしてはならないものとします。</li>
                                    <li>アカウントの管理不十分、使用上の過誤、第三者の利用等によって利用者に損害が生じた場合でも、当プロバイダは一切責任を負わないものとします。</li>
                                </ol>

                                <h3>第4条（禁止事項）</h3>
                                <p>利用者は、本サービスの利用にあたり、以下の行為を行ってはならないものとします。</p>
                                <ol>
                                    <li>法令または公序良俗に違反する行為</li>
                                    <li>犯罪行為に関連する行為</li>
                                    <li>当プロバイダまたは第三者の知的財産権、肖像権、プライバシーの権利、名誉その他の権利または利益を侵害する行為</li>
                                    <li>本サービスの運営を妨害する行為</li>
                                    <li>不正アクセス、または不正な情報収集をする行為</li>
                                    <li>その他、当プロバイダが不適切と判断する行為</li>
                                </ol>


                                <h3>第5条（サービスの内容）</h3>
                                <ol>
                                    <li>本サービスは、Twitter/X（現X）への自動投稿機能を提供するサービスです。</li>
                                    <li>当プロバイダは、本サービスの内容をいつでも変更、中断、または終了できるものとします。</li>
                                    <li>本サービスの利用には、別途Twitter/Xアカウントが必要となります。</li>
                                    <li>本サービスは、必ずしも全てのTwitter/Xの機能に対応しているわけではありません。</li>
                                    <li>当プロバイダは、本サービスの品質、性能、完全性について、いかなる保証も行うものではありません。</li>
                                </ol>

                                <h3>第6条（利用料金）</h3>
                                <ol>
                                    <li>本サービスの基本機能は無料で利用できます。</li>
                                    <li>特定機能の利用には、別途料金が発生する場合があります。</li>
                                    <li>利用料金は、当プロバイダが別途定める方法により支払うものとします。</li>
                                </ol>

                                <h3>第7条（免責事項）</h3>
                                <ol>
                                    <li>当プロバイダは、本サービスの中断、停止、変更、終了、利用不能またはそれらによって生じた損害について、一切の責任を負わないものとします。</li>
                                    <li>当プロバイダは、本サービスの内容、提供の遅延、中断、またはエラーにより発生した損害について、一切の責任を負わないものとします。</li>
                                    <li>当プロバイダは、利用者が本サービスを利用したことによって生じた損害について、一切の責任を負わないものとします。</li>
                                    <li>利用者は、自己の責任において本サービスを利用するものとし、第三者との間で紛争が生じた場合も、自己の責任と費用で解決するものとします。</li>
                                    <li>本サービスに関連して利用者と他の利用者または第三者との間で生じた紛争について、当プロバイダは一切責任を負わないものとします。</li>
                                </ol>

                                <h3>第8条（規約の変更）</h3>
                                <ol>
                                    <li>当プロバイダは、必要に応じて、本規約をいつでも変更できるものとします。</li>
                                    <li>変更後の本規約は、当プロバイダウェブサイト上に掲載した時点で効力を生じるものとします。</li>
                                    <li>利用者は、変更後の本規約に同意したものとみなされます。</li>
                                </ol>

                                <h3>第9条（準拠法と裁判管轄）</h3>
                                <ol>
                                    <li>本規約の解釈にあたっては、日本法を準拠法とします。</li>
                                    <li>本サービスに関連して、利用者と当プロバイダとの間で紛争が生じた場合には、{setEnvValue(process.env.NEXT_PUBLIC_JUSTICE)}を第一審の専属的合意管轄裁判所とします。</li>
                                </ol>

                                <p><strong>附則</strong></p>
                                <p>本規約は、{setEnvValue(process.env.NEXT_PUBLIC_START)}から施行します。</p>
                            </div>
                        </Col>
                    </Row>
                </>
            ),
        }
    ];

    return (
        <Tabs defaultActiveKey="1" items={items} />
    );
}