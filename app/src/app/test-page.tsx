import Head from "next/head";

export default function TestPage() {
  return (
    <div>
      <Head>
        <title>Test Page</title>
        <meta
          name="description"
          content="This is a description of the Test Page"
        />
      </Head>
      <div style={{ padding: "0px 30px", fontSize: "15px", height: "100%" }}>
        <p>Content on CSR page</p>
        <button>Some button</button>
      </div>
    </div>
  );
}
