import React from 'react';
import '../DocumentUpload/DocumentUpload.css';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  onSkip?: () => void;
  step?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title, subtitle, onSkip, step }) => {
  const titles: Record<string, { title: string; subtitle?: string }> = {

    verification: {
      title: 'Verifying...',
      subtitle: 'Please wait while we verify your identity.',
    },
    form: {
      title: 'Complete Your Details',
      subtitle: 'Review and finish the form with your verified data.',
    },
    failedForm: {
        title: 'Please Complete your Details manually',
        subtitle: 'We were unable to verify your identity. Please complete the form manually.',
    }
  };

  const content = step && titles[step] ? titles[step] : { title, subtitle };

  return (
    <div className="layout-wrapper">
      <div className="layout-pane">
      {content.title != 'Please Complete your Details manually' && <>
        <h1 className="pane-title">{content.title}</h1>
        {content.subtitle && <p className="pane-subtitle">{content.subtitle}</p>}</>
        }

    {content.title == 'Please Complete your Details manually' && <>
            <h1 className="pane-title-error">{content.title}</h1>
            {content.subtitle && <p className="pane-subtitle">{content.subtitle}</p>}</>
            }

        <div className="layout-content">{children}</div>


      </div>
    </div>
  );
};

export default Layout;
