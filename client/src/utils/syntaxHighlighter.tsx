import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const renderers = {
  code: ({ language, value }: { language: any; value: any }) => {
    return (
      <SyntaxHighlighter
        style={materialLight}
        language={language}
        children={value}
        wrapLongLines={true}
      />
    );
  },
};
