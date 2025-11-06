import React, { FC, PropsWithChildren } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// --- INLINE MARKDOWN COMPONENT LOGIC ---

// 1. Define the Minimal Required Props
interface MarkdownExtraProps {
    node?: unknown; 
}

// 2. Define Final Component Props
type ParagraphProps = PropsWithChildren<
    React.HTMLAttributes<HTMLParagraphElement> &
    MarkdownExtraProps
>;

type LinkProps = PropsWithChildren<
    React.AnchorHTMLAttributes<HTMLAnchorElement> & 
    MarkdownExtraProps
>;

type HeadingProps = PropsWithChildren<
    React.HTMLAttributes<HTMLHeadingElement> &
    MarkdownExtraProps
>;

type ListProps = PropsWithChildren<
    React.HTMLAttributes<HTMLUListElement | HTMLOListElement> &
    MarkdownExtraProps
>;


/**
 * Custom component for standard paragraphs (p tags).
 * Ensures a consistent bottom margin to maintain vertical separation (whitespace).
 */
const CustomParagraph: FC<ParagraphProps> = (props) => {
  const { node: _, ...pProps } = props;
  // Explicitly ensuring there is a margin-bottom on every paragraph (p tag)
  return <p className="mb-4" {...(pProps as React.HTMLAttributes<HTMLParagraphElement>)} />;
};

/**
 * Custom component for H2/H3 tags, used here as the standard subtitle style.
 */
const CustomH2: FC<HeadingProps> = (props) => {
    const { node: _, ...hProps } = props;
    // CRITICAL FIX: Use !important prefix to override the surrounding prose-lg styles.
    // Standardized to !text-2xl for a medium subtitle size.
    return (
        <h2 
            className="!text-2xl !font-bold text-white-900 mt-6 mb-3 tracking-tight" 
            {...(hProps as React.HTMLAttributes<HTMLHeadingElement>)}
        />
    );
};


/**
 * Custom component for H1 tags in the markdown content.
 */
const CustomH1: FC<HeadingProps> = (props) => {
    const { node: _, ...hProps } = props;
    // NOTE: If you want H1 to be *larger* than H2, change "!text-2xl" to "!text-3xl" or "!text-4xl".
    return (
        <h1 
            className="!text-2xl !font-bold text-white-900 mt-8 mb-4 border-b border-gray-300 pb-2 tracking-tight" 
            {...(hProps as React.HTMLAttributes<HTMLHeadingElement>)}
        />
    );
};


const CustomList: FC<ListProps> = (props) => {
    const { node: _, ...lProps } = props;
    return <ul className="list-disc ml-6 my-4 space-y-2" {...lProps as React.HTMLAttributes<HTMLUListElement>} />;
};


/**
 * Custom link component for security and usability.
 */
const CustomLink: FC<LinkProps> = (props) => {
  const { node: _, ...aProps } = props;
  return <a {...(aProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)} target="_blank" rel="noopener noreferrer" />;
};


// --- DEBUG UTILITY FUNCTION ---
const visualizeNewlines = (text: string): string => {
    // 1. Replace double newlines (\n\n) which signal a paragraph/block break
    text = text.replace(/\n\n/g, '<span style="color: blue; background-color: #e0f7fa; font-weight: bold;">[¶¶]</span>');
    
    // 2. Replace single newlines (\n) which signal a soft line break or bad separator
    text = text.replace(/\n/g, '<span style="color: red; background-color: #ffebee; font-weight: bold;">[¶]</span>');
    
    // 3. Highlight the target character: #
    text = text.replace(/#/g, '<span style="color: black; background-color: #ffcc00; font-weight: bold;">#</span>');
    return text;
};


/**
 * The main component to render markdown content.
 */
interface FormattedContentProps {
    content: string;
    isDebug?: boolean; // New optional prop for debugging
}

const FormattedContent: FC<FormattedContentProps> = ({ content, isDebug = false }) => {
    
    let cleanedContent = String(content);

    // 1. CRITICAL CLEANUP: Replace the known corrupt strings with actual newlines.
    // This MUST happen first to allow the Markdown parser to recognize blocks.
    cleanedContent = cleanedContent
        // Replace the corrupt paragraph break string (e.g., ...[¶¶]#What I Enjoyed...)
        .replaceAll('#e0f7fa; font-weight: bold;">[¶¶]', '\n\n') 
        // Replace the corrupt line break string
        .replaceAll('#ffebee; font-weight: bold;">[¶]', '\n') 
        .replace(/\r\n/g, '\n') // Normalize all newlines to LF
        .trim(); // Remove any leading/trailing whitespace

    // 2. Targeted Header and List Block Separation & Spacing
    
    // a. Force a double newline before every hash/heading symbol to ensure it's a block element.
    cleanedContent = cleanedContent.replace(/(\n{1,2})#/g, '\n\n#');

    // **CRITICAL FIX FOR RENDERING:** Ensure a space exists after a hash (#) 
    // that is followed immediately by a non-space character (like a letter).
    // This converts "#What I Enjoyed" to "# What I Enjoyed".
    cleanedContent = cleanedContent.replace(/#([^\s#])/g, '# $1'); 
    
    // b. Force a double newline before any list marker.
    cleanedContent = cleanedContent.replace(/(\n{1,2})([\*\-\d]\.)/g, '\n\n$2');

    // c. Handle the case where the content starts with a hash.
    if (cleanedContent.startsWith('#')) {
        // Ensure it has a space if needed
        if (cleanedContent.match(/^#([^\s#])/)) {
             cleanedContent = cleanedContent.replace(/^#([^\s#])/, '# $1');
        }
        // Then ensure it has preceding newlines for proper block recognition
        cleanedContent = '\n\n' + cleanedContent;
    }

    // 3. Final cleanup: normalize excessive newlines (more than 3) down to 2.
    cleanedContent = cleanedContent.replace(/\n{3,}/g, '\n\n');

    // --- DEBUG MODE EXECUTION ---
    if (isDebug) {
        // If debug mode is active, we bypass ReactMarkdown and render the raw string with visible characters
        const debugHtml = visualizeNewlines(cleanedContent);
        return (
            <div 
                className="font-mono text-sm p-4 bg-gray-100 border border-red-500 whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: debugHtml }}
            />
        );
    }
    // --- END DEBUG MODE ---

    return (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: CustomParagraph,
            a: CustomLink,
            h1: CustomH1,
            h2: CustomH2,
            ul: CustomList,
            h3: CustomH2, // Mapping H3 to H2 styling
            ol: CustomList, 
          }}
        >
          {cleanedContent}
        </ReactMarkdown>
    );
};

export default FormattedContent;