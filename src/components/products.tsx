import { Products, Item } from '../../common/products';
import lotus from '../../public/images/lotus.png';
import prime from '../../public/images/prime.png';
import xauto from '../../public/images/xauto.png';
import reader from '../../public/images/reader.png';
import readme from '../../public/images/readme.png';
import excelto from '../../public/images/excel-to.png';

export const ProductsList = () => {
    const items: Item[] = [
        {
            name: 'レンコンシェフ/Lotus root Chef',
            url: 'https://github.com/howlrs/lotus-root-chef',
            image_url: lotus.src,
            icon_url: 'https://github.com/howlrs/lotus-root-chef/blob/master/src-tauri/icons/128x128@2x.png?raw=true',
            description: 'レンコンシェフは、指定価格帯の指定枚数の板に対して、追従しながら指値を行います。'
        },
        {
            name: '[GeminiAI生成] 講義と漫才で学ぶ算数数学',
            url: 'https://prime.howlrs.net/',
            image_url: prime.src,
            icon_url: 'https://prime.howlrs.net//icon.png',
            description: '講義と漫才で学ぶ算数数学です。Google Gemini AIが各数学公式を講義、漫才形式で出力しました。自分にあった出力を選択し算数や数学を学ぶことができます。'
        },
        {
            name: 'X LONG POST AUTO WITH SCHEDULER',
            url: 'https://xauto.howlrs.net/',
            image_url: xauto.src,
            icon_url: 'https://xauto.howlrs.net/icon.svg',
            description: 'X LONG POST AUTO WITH SCHEDULER: Twitter/X 自動投稿マネージャーはTwitter/Xの自動投稿サービスを提供しております。'
        },
        {
            name: 'PDF READER',
            url: 'https://github.com/howlrs/pdf-reader/releases',
            image_url: reader.src,
            icon_url: 'https://github.com/howlrs/pdf-reader/blob/release/src-tauri/icons/128x128.png?raw=true',
            description: 'PDFファイルから構造化したCSVデータを生成し、結果をディレクトリ内に保存します。'
        },
        {
            name: 'Generate README with GEMINI AI',
            url: 'https://github.com/howlrs/gen-readme/releases',
            image_url: readme.src,
            icon_url: 'https://github.com/howlrs/gen-readme/blob/master/src-tauri/icons/128x128.png?raw=true',
            description: 'ディレクトリパスを渡すとディレクトリ内以下ファイルを走査し、リスト化、GEMINI AIにドキュメント化を依頼し、結果をディレクトリ内に保存します。'
        },
        {
            name: 'Excel to CSV',
            url: 'https://github.com/howlrs/excel-to-csv/releases',
            image_url: excelto.src,
            icon_url: 'https://github.com/howlrs/excel-to-csv/blob/master/src-tauri/icons/128x128.png?raw=true',
            description: 'Excelファイルを解析してCSV形式のデータに変換するツールを提供することを目的としています。具体的には、ユーザーがExcelファイルをアプリケーションにドロップすることで、その内容を解析し、CSV形式のテキストデータとして取得できるようにします。'
        },
    ];



    return (
        <Products items={items} />
    );
};