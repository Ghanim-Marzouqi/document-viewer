'use client';

import PDFViewer from '../../../components/viewers/PDFViewer';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function PDFViewerContent() {
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

export default function Page() {
    return (
        <Suspense fallback={<div className="min-h-screen p-4">جاري التحميل...</div>}>
            <PDFViewerContent />
        </Suspense>
    );
}