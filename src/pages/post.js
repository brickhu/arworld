import Link from "next/link"
import { useState } from "react"
import { useForm } from 'react-hook-form';
import { getCurrentWallet, getKeyByAddress, postDataItem } from "@/lib/arweave"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"




export default function Post({ }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { toast } = useToast()
  const [ posting,setPosting ] = useState(false)

  const onSubmit = async(event) => {
    event.preventDefault();
    setPosting(true)
    try {
      const address = getCurrentWallet()
      if(!address) throw 'no address'
      const key = await getKeyByAddress(address)
      const formData = new FormData(event.target)
      const title = formData.get("title")
      const body = formData.get("body")
      const tx =  await postDataItem({
        data: {
          "title": title,
          "body": body
        },
        tags:[{name:"Type",value:"JSON"}]
      },key)

      if(!tx) throw 'no tx'
      toast({
        description: tx.id,
      })
      setPosting(false)
    } catch (error) {
      toast({
        variant: "destructive",
        description: error,
      })
      setPosting(false)
    }
  }

  return (
    <div>
      <div className="fixed bottom-0 left-0 right-0">
      </div>
      
      <div><Link href="/">back</Link></div>
      <div className="flex justify-center flex-col items-center">
        <form onSubmit={onSubmit}>
            <Input type="text" name="title" />
            <Textarea id="content" rows={5} placeholder="Type here" className="w-[90vw] max-w-xs h-64 my-8" name="body"></Textarea>
            <Button type="submit" disabled={posting} >{ posting?"posting":"post" }</Button>
        </form>
      </div>
    </div>
  )
}