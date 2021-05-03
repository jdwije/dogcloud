import { unfurl as uf } from 'unfurl.js'
import { AppContext } from "../../hoc"
import fetch from 'node-fetch'
import ft from 'file-type'
import { ExifImage } from "exif"

export const rurl = async (cnf: AppContext, parent: any, args: any) => {
  const { url } = args.input;
  const res = await fetch(url)
  const t = res.headers.get('content-type')
  const response = {
    source: url,
    createdAt: (new Date()).toISOString(),
    mimeType: t,
  }

  if (t?.match(/image/)) {
    const buf = await res.buffer()
    const fileType = await ft.fromBuffer(buf)
    const data = buf.toString('base64')

    if (t?.match(/image\/jpe?g/)) {
      const meta = true
    }

    return {
      ...response,
      mimeType: fileType?.mime,
      resource: `data:${fileType?.mime};base64,${data}`
    }
  }
  else if (t?.match(/text/)) {
    if (t?.match(/text\/html/)) {
      const meta = await uf(url);
      const data = (new Buffer(await res.text())).toString('base64')

      return {
        ...response,
        thumbnail: meta.favicon,
        title: meta.title,
        resource: `data:${t};base64,${data}`
      }
    }
  }

  return response
}
