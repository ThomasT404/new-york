import React, { useEffect, useState } from "react"
import { usePrismicPreview } from "gatsby-source-prismic"

import PageTemplate from "../templates/page"

// Note that the `location` prop is taken and provided to the `usePrismicPreview` hook.
const PreviewPage = ({ location }) => {
  const [prevData, setData] = useState(null)
  const { isPreview, previewData, path } = usePrismicPreview({
    // The repositoryName value from your `gatsby-config.js`.
    repositoryName: "new-york",
  })

  // This useEffect runs when values from usePrismicPreview update. When
  // preview data is available, this will save the data globally and redirect to
  // the previewed document's page.
  useEffect(() => {
    // If this is not a preview, skip.
    //   null = Not yet determined if previewing.
    //   true = Preview is available.
    //   false = Preview is not available.
    if (isPreview === false) return

    // Save the preview data to somewhere globally accessible. This could be
    // something like a global Redux store or React context.
    //
    // We'll just put it on window.
    setData(previewData)
    window.__PRISMIC_PREVIEW_DATA__ = previewData
  }, [isPreview, previewData, path, setData])

  // Tell the user if this is not a preview.
  if (isPreview === false) return <div>Not a preview!</div>

  return prevData ? (
    prevData.prismicPage ? (
      <PageTemplate data={prevData} />
    ) : (
      <div>error..</div>
    )
  ) : (
    <div>Loading preview...</div>
  )
}

export default PreviewPage
