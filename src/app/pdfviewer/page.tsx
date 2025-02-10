'use client';

import PDFViewer from '../../../components/viewers/PDFViewer';
import { useSearchParams } from 'next/navigation';

export default function Page() {
    const searchParams = useSearchParams();
    const file = searchParams.get('file');

    if (!file) {
        return <div className="min-h-screen p-4">لم يتم العثور على المستند المطلوب</div>;
    }

    return (
        <main className="min-h-screen p-4">
            <PDFViewer documentPath={file} />
        </main>
    );
}
