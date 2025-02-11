'use client';

import React, { useEffect, useState, useRef } from 'react';
import { 
    PdfViewerComponent, 
    Toolbar, 
    Magnification, 
    Navigation, 
    LinkAnnotation, 
    BookmarkView,
    ThumbnailView, 
    TextSelection, 
    Annotation, 
    TextSearch, 
    FormFields, 
    FormDesigner, 
    Inject,
    ToolbarItem
} from '@syncfusion/ej2-react-pdfviewer';

interface PDFViewerProps {
    documentPath: string;
}

// Define a custom type for the toolbar event
type PdfViewerToolbarClickEvent = {
    item: {
        id: string;
    };
};

export default function PDFViewer({ documentPath }: PDFViewerProps) {
    const [resourceUrl, setResourceUrl] = useState('');
    const viewerRef = useRef<PdfViewerComponent | null>(null);

    useEffect(() => {
        setResourceUrl(`${window.location.protocol}//${window.location.host}/js/ej2-pdfviewer-lib`);
    }, []);

    const handleToolbarClick = (args: PdfViewerToolbarClickEvent) => {
        console.log("Toolbar Clicked:", args);

        if (args.item.id === 'CustomPrintButton') {
            console.log("Custom Print Button Clicked");

            // Fetch the PDF manually from the documentPath
            fetch(documentPath)
                .then(response => response.blob()) // Convert to Blob
                .then(blob => {
                    console.log("✅ PDF Blob Retrieved");

                    // Create a Blob URL
                    const pdfURL = URL.createObjectURL(blob);

                    // Open in a new tab and trigger print
                    const printWindow = window.open(pdfURL);
                    if (printWindow) {
                        printWindow.onload = () => {
                            printWindow.print();
                            URL.revokeObjectURL(pdfURL); // Clean up the URL after printing
                        };
                    } else {
                        console.error("❌ Failed to open print window.");
                    }
                })
                .catch(error => console.error("❌ Error fetching PDF:", error));
        }
    };

    const handleDocumentLoad = () => {
        console.log("✅ PDF Loaded Successfully - Setting Fit Width");
        if (viewerRef.current) {
            viewerRef.current.magnificationModule.fitToWidth(); // Fit Width
        }
    };

    if (!resourceUrl) {
        return null; // or a loading state
    }

    return (
        <div className='control-section'>
            <PdfViewerComponent 
                id="container" 
                ref={viewerRef} 
                documentPath={documentPath}
                resourceUrl={resourceUrl}
                enablePrint={false} // Disable default print button
                toolbarClick={handleToolbarClick} // Handle custom print button click
                documentLoad={handleDocumentLoad} // Fit to Width when PDF Loads
                toolbarSettings={{ 
                    showTooltip: true, 
                    toolbarItems: [
                        'PageNavigationTool', 
                        'MagnificationTool', 
                        'PanTool', 
                        'SearchOption', 
                        { 
                            text: 'Print', 
                            prefixIcon: 'e-icons e-print', 
                            id: 'CustomPrintButton', 
                            align: 'Right' 
                        }
                    ] as ToolbarItem[]
                }}
                style={{ height: '100vh' }}>
                <Inject services={[
                    Toolbar,
                    Magnification,
                    Navigation,
                    Annotation,
                    LinkAnnotation,
                    BookmarkView,
                    ThumbnailView,
                    TextSelection,
                    TextSearch,
                    FormFields,
                    FormDesigner
                ]}/>
            </PdfViewerComponent>
        </div>
    );
}
