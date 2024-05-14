'use client'

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Browser ({}) {
  function handelGo(){
    console.log(webview)
  }
  return <div>
    <div><Link href="/">back</Link></div>
    <div className="w-full ">
      <form className="flex">
        <Input name="tx" placeholder="address,tx,or ArNS ..."></Input>
        <Button onClick={handelGo}>go</Button>
      </form>
    </div>
    {/* <iframe
      id="inlineFrameExample"
      title="Inline Frame Example"
      name="Inline Frame Example"
      width="400"
      height="400"
      src="https://7mgheravrbwihqxrrtmyi6n4ntvfickcqgggv7fnoo2o3vdmmxua.g8way.io/-wxyRBWIbIPC8YzZhHm8bOpUCUKBjGr8rXO07dRsZeg?"
      sandbox=""
    >
    </iframe> */}

  {/* <webview id="foo" src="https://www.github.com/" style="display:inline-flex; width:640px; height:480px"></webview> */}
  <webview src="https://www.baidu.com" className="w-full h-[90vh]" allowpopups></webview>

  </div>
}
