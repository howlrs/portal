'use client';

import { useState } from "react";
import { Button, Spin, Form, FormProps, Input, message, Select } from "antd";
import axios from "axios";

interface ContactProps {
    from: string;
    email: string;
    subject: string;
    message: string;
}

const today = new Date();
// [
//     { label: 'お問い合わせ', value: 'お問い合わせ' },
//     { label: 'バグ報告', value: 'バグ報告' },
//     { label: 'ご意見', value: 'ご意見' },
//     { label: 'その他', value: 'その他' },
// ]
// サブジェクト変更でmessageにテンプレートを入れる
const TemplateBug = `バグの内容:
- どのようなバグか
- どのような状況で発生したか

再現手順:
期待する動作:
実際の動作:
OS:
ブラウザ:
発生時刻: ${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()} ${today.getHours()}:${today.getMinutes()}
`;

export const Contact = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [messageAPI, contextHolder] = message.useMessage();

    const send: FormProps<ContactProps>['onFinish'] = async (value) => {
        setLoading(true);

        try {
            if (!value) {
                throw new Error('必要な情報が入力されていません');
            }

            const domain = `${process.env.NEXT_PUBLIC_API_DOMAIN}`;
            const path = domain + '/contact';
            value.from = 'portal';

            const result = await axios.post(path, value);

            if (result.data.code !== 200) {
                throw new Error('送信に失敗しました');
            }

            messageAPI.open({
                type: 'success',
                content: 'お問い合わせありがとうございます。送信が完了しました。 contact id: ' + result.data.message.contact_id,
                duration: 3,
            });
        } catch (error) {
            messageAPI.open({
                type: 'error',
                content: `エラーが発生しました: ${error}`,
                duration: 3,
            })
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {contextHolder}

            <Spin spinning={loading}>
                <Form
                    name="basic"
                    form={form}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={send}
                    autoComplete="off"
                >
                    <Form.Item<ContactProps>
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email' }]}
                    >
                        <Input />
                    </Form.Item>

                    {/* 選択式のサブジェクト */}
                    <Form.Item<ContactProps>
                        label="Subject"
                        name="subject"
                        rules={[{ required: true, message: 'Please select a subject' }]}
                    >
                        <Select
                            style={{ textAlign: 'left' }}
                            onChange={(value) => {
                                if (value === 'バグ報告') {
                                    form.setFieldsValue({ message: TemplateBug });
                                } else {
                                    form.setFieldsValue({ message: '' });
                                }
                            }}
                            options={[
                                { label: 'お問い合わせ', value: 'お問い合わせ' },
                                { label: 'バグ報告', value: 'バグ報告' },
                                { label: 'ご意見', value: 'ご意見' },
                                { label: 'その他', value: 'その他' },
                            ]}
                        >
                        </Select>
                    </Form.Item>

                    <Form.Item<ContactProps>
                        label="Message"
                        name="message"
                        rules={[{ required: true, message: 'Please input your message' }]}
                    >
                        <Input.TextArea rows={5} />
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            送信
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </>
    );
};

