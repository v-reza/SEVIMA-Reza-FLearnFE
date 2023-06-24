import { useEffect, useState } from "react"
import axios from "axios"
import qs from "qs"
import _ from "lodash"
import { API_BASE_URL } from "../config/env"

type Props = {
  resource: string
  baseUrl?: string
  pks: string[]
  filters?: any
}


export type ListResult<T> = {
  loading: boolean,
  datas: T[] | undefined,
  errors: any,
  total: number,
  reload: () => void
}

export function useList<T>(props: Props): ListResult<T> {
  const [datas, setDatas] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [errors, setErrors] = useState<unknown>()
  const { filters = {}, pks = [], baseUrl = API_BASE_URL , resource } = props


  const reload = async () => {
    const params = qs.stringify({ ...filters })

    try {
      setLoading(true)
      await axios.get(`${baseUrl}${resource}?${params}`).then((res) => {
        setDatas(res.data.map((item: any) => {
          return {
            ...item,
            _id_: _.pick(item, pks)
          }
        }))
      })
    } catch (error) {
      setErrors(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    reload()
  }, [JSON.stringify(filters), resource])


  return { reload, datas, loading, total: datas.length, errors }
}

export default useList