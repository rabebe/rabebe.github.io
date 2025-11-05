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
 * Allows empty paragraphs to render, preserving original vertical spacing/whitespace.
 */
const CustomParagraph: FC<ParagraphProps> = (props) => {
  const { node: _, ...pProps } = props;
  // Explicitly ensuring there is a margin-bottom on every paragraph (p tag)
  return <p className="mb-4" {...(pProps as React.HTMLAttributes<HTMLParagraphElement>)} />;
};

/**
 * Custom component for H1 tags in the markdown content.
 * Styled as a prominent subtitle to distinguish it from the page's main title.
 */
const CustomH1: FC<HeadingProps> = (props) => {
    const { node: _, ...hProps } = props;
    // Increased size to text-3xl and color to text-gray-900 for dominance
    return (
        <h1 
            className="text-3xl font-extrabold text-gray-900 mt-8 mb-4 border-b border-gray-300 pb-2 tracking-tight" 
            {...(hProps as React.HTMLAttributes<HTMLHeadingElement>)}
        />
    );
};

// --- START: ADDED FALLBACK COMPONENTS FOR RELIABILITY ---

const CustomH2: FC<HeadingProps> = (props) => {
    const { node: _, ...hProps } = props;
    // Increased size to text-2xl and color to text-gray-900 for dominance
    return (
        <h2 
            className="text-2xl font-bold text-gray-900 mt-6 mb-3 tracking-tight" 
            {...(hProps as React.HTMLAttributes<HTMLHeadingElement>)}
        />
    );
};

const CustomList: FC<ListProps> = (props) => {
    const { node: _, ...lProps } = props;
    // Add margin and padding to ensure lists stand out, overriding minimal default prose styling if needed
    return <ul className="list-disc ml-6 my-4 space-y-2" {...lProps as React.HTMLAttributes<HTMLUListElement>} />;
};

// --- END: ADDED FALLBACK COMPONENTS FOR RELIABILITY ---


/**
 * Custom link component for security and usability.
 */
const CustomLink: FC<LinkProps> = (props) => {
  const { node: _, ...aProps } = props;
  return <a {...(aProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)} target="_blank" rel="noopener noreferrer" />;
};


/**
 * The main component to render markdown content.
 * @param {string} content - The markdown string to render.
 */
interface FormattedContentProps {
    content: string;
}

const FormattedContent: FC<FormattedContentProps> = ({ content }) => {
    
    // FIX: Simplified and highly robust Pre-processing Logic
    let cleanedContent = content
        .replace(/\r\n/g, '\n') // 1. Normalize all newlines to LF
        .trim(); // 2. Remove any leading/trailing whitespace

    // 3a. CRITICAL FIX: Handle case where content starts with '#' but needs a block-level break.
    // We add a leading double newline to ensure the first '#' is recognized as H1.
    if (cleanedContent.startsWith('#')) {
        cleanedContent = '\n\n' + cleanedContent;
    }
    
    // 3b. Force a double newline before every hash/heading symbol mid-text.
    // This is the most reliable way to ensure the parser recognizes the block element,
    // catching cases where the preceding newline was lost or corrupted.
    // It targets any single newline followed by a hash and makes it a double newline.
    cleanedContent = cleanedContent.replace(/\n#/g, '\n\n#');

    // 4. Clean up any accidental triple newlines (or more) that the above process might have created.
    cleanedContent = cleanedContent.replace(/\n\n\n+/g, '\n\n');

    return (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: CustomParagraph,
            a: CustomLink,
            h1: CustomH1,
            h2: CustomH2,
            ul: CustomList,
            h3: CustomH2,
            ol: CustomList, 
          }}
        >
          {cleanedContent}
        </ReactMarkdown>
    );
};

export default FormattedContent;