// メールアドレスを分割して表示
export const emailDisplay = (emailAddress: string | undefined) => {
    if (!emailAddress) return null;

    const [user, domain] = emailAddress.split('@');
    return (
        <span>
            {user}
            <span style={{ display: 'none' }}>no-spam</span>
            @
            {domain}
        </span>
    );
};


export const setEnvValue = (value: string | undefined, defaultValue: string = '未設定'): string => {
    return value?.trim() || defaultValue;
};