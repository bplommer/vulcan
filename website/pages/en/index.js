const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");

const MarkdownBlock = CompLibrary.MarkdownBlock;
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const { siteConfig, language = "" } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
    const langPart = `${language ? `${language}/` : ""}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        <span>
          <img className="projectTitleLogo" src={siteConfig.titleIcon} />
          {siteConfig.title}
        </span>
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href={siteConfig.apiUrl}>API Docs</Button>
            <Button href={docUrl("overview", language)}>Documentation</Button>
            <Button href={siteConfig.repoUrl}>View on GitHub</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = "" } = this.props;
    const { baseUrl, buildInfo } = siteConfig;
    const {
      coreModuleName,
      latestVersion,
      organization,
      scalaPublishVersions
    } = buildInfo;

    const latestVersionBadge = latestVersion
      .replace("-", "--")
      .replace("_", "__");

    const Block = props => (
      <Container
        padding={["bottom", "top"]}
        id={props.id}
        background={props.background}
      >
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const index = `[![Travis](https://img.shields.io/travis/ovotech/vulcan/master.svg)](https://travis-ci.org/ovotech/vulcan) [![Codecov](https://img.shields.io/codecov/c/github/ovotech/vulcan.svg)](https://codecov.io/gh/ovotech/vulcan) [![Gitter](https://img.shields.io/gitter/room/ovotech/vulcan.svg?colorB=36bc97)](https://gitter.im/ovotech/vulcan) [![Version](https://img.shields.io/badge/version-v${latestVersionBadge}-orange.svg)](https://index.scala-lang.org/ovotech/vulcan)

Functional Avro encodings for Scala using the official Apache Avro library.<br>
Project is under active development. Feedback and contributions welcome.

### Getting Started
To get started with [sbt](https://scala-sbt.org), simply add the following line to your \`build.sbt\` file.

\`\`\`scala
libraryDependencies += "${organization}" %% "${coreModuleName}" % "${latestVersion}"
\`\`\`

Published for Scala ${scalaPublishVersions}. For changes, refer to the [release notes](https://github.com/ovotech/vulcan/releases).
`.trim();

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <div className="index">
            <MarkdownBlock>{index}</MarkdownBlock>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Index;
