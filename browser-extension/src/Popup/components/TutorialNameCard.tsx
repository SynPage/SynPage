import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Skeleton,
  Typography,
} from '@mui/material'
import { TutorialInfo } from '../../client/generated'
import synlogo from '../../assets/logo.svg'

import gcplogo from '../../assets/gcp.svg'
import awslogo from '../../assets/aws.svg'
import azurelogo from '../../assets/azure.svg'

export interface TutorialNameCardProps {
  tutorial?: TutorialInfo
  onClick: (e: any) => void
  loading?: boolean
}

export const TutorialNameCard = (props: TutorialNameCardProps) => {
  const { tutorial, onClick, loading } = props

  return (
    <Box alignContent={'center'}>
      <Card
        sx={{
          flexGrow: 1,
          borderRadius: 2,
          boxShadow: 0,
          border: 1,
          borderColor: '#dddddd',
          display: 'flex',
          height: 150,
        }}
        elevation={3}
      >
        <CardActionArea sx={{ display: 'flex' }} onClick={onClick}>
          {loading ? (
            <Skeleton variant="rectangular" width={80} height={80} />
          ) : (
            // Conditionally render platform logo (AWS, Azure, GCP)
            <Typography variant="body1">
              {tutorial?.description?.toLowerCase().includes('aws') && (
                <CardMedia
                  component="img"
                  sx={{ width: 80 }}
                  image={awslogo}
                  alt="AWS Logo"
                />
              )}
              {tutorial?.description?.toLowerCase().includes('azure') && (
                <CardMedia
                  component="img"
                  sx={{ width: 80 }}
                  image={azurelogo}
                  alt="Azure Logo"
                />
              )}
              {tutorial?.description?.toLowerCase().includes('gcp') && (
                <CardMedia
                  component="img"
                  sx={{ width: 80 }}
                  image={gcplogo}
                  alt="GCP Logo"
                />
              )}
            </Typography>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              {loading ? (
                <Skeleton variant="rectangular" width={140} height={70} />
              ) : (
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {tutorial?.title}
                </Typography>
              )}
            </CardContent>
          </Box>
        </CardActionArea>
      </Card>
    </Box>
  )
}
