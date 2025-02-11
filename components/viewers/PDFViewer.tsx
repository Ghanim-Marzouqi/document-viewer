'use client';

import React, { useEffect, useState } from 'react';
import { 
    PdfViewerComponent, 
    Toolbar, 
    Magnification, 
    Navigation, 
    LinkAnnotation, 
    BookmarkView,
    ThumbnailView, 
    Print, 
    TextSelection, 
    Annotation, 
    TextSearch, 
    FormFields, 
    FormDesigner, 
    Inject 
} from '@syncfusion/ej2-react-pdfviewer';

interface PDFViewerProps {
    documentPath: string;
}

export default function PDFViewer({ documentPath }: PDFViewerProps) {
    const [resourceUrl, setResourceUrl] = useState('');

    useEffect(() => {
        setResourceUrl(`${window.location.protocol}//${window.location.host}/js/ej2-pdfviewer-lib`);
    }, []);

    if (!resourceUrl) {
        return null; // or a loading state
    }
    
    return (
        <div className='control-section'>
            <PdfViewerComponent 
                id="container" 
                documentPath={documentPath}
                resourceUrl={resourceUrl}
                toolbarSettings={{ 
                    showTooltip : true, 
                    toolbarItems: [
                        'PageNavigationTool', 
                        'MagnificationTool', 
                        'PanTool', 
                        'SearchOption', 
                        'PrintOption'
                    ]
                }}
                style={{ 'height': '100vh' }}>
                <Inject services={[
                    Toolbar,
                    Magnification,
                    Navigation,
                    Annotation,
                    LinkAnnotation,
                    BookmarkView,
                    ThumbnailView,
                    Print,
                    TextSelection,
                    TextSearch,
                    FormFields,
                    FormDesigner
                ]}/>
            </PdfViewerComponent>
        </div>
    );
}
