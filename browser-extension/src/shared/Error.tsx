import { Alert } from '@mui/material'

export const Error = (props: { error: string | undefined }) => {
  const { error } = props

  if (!error) {
    return <></>
  }

  return (
    <div>
      <Alert sx={{ borderRadius: 2 }} severity={'error'}>
        {error}
      </Alert>
    </div>
  )
}
