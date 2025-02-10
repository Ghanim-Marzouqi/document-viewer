'use client';

import React from 'react';
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
    return (
        <div className='control-section'>
            <PdfViewerComponent 
                id="container" 
                documentPath={documentPath}
                resourceUrl="https://cdn.syncfusion.com/ej2/26.2.11/dist/ej2-pdfviewer-lib"
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
