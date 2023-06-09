import {Box, Card, CardActionArea, CardContent, CardMedia, Grid, Paper, Skeleton, Typography} from "@mui/material";
import {TutorialInfo} from "../../client/generated";
import synlogo from "../../assets/logo.svg";

export interface TutorialNameCardProps {
	tutorial?: TutorialInfo,
	onClick: (e: any) => void,
	loading?: boolean
}

export const TutorialNameCard = (props: TutorialNameCardProps) => {
	const {tutorial, onClick, loading} = props;

	return (
		<Box alignContent={'center'}>
			<Card sx={{flexGrow: 1, borderRadius: 3, display: 'flex', height: 150}} elevation={3}>
				<CardActionArea sx={{display: 'flex'}} onClick={onClick}>
					{
						loading ? <Skeleton variant="rectangular" width={80} height={80}/> :
							<CardMedia
								component="img"
								sx={{width: 80}}
								image={synlogo}
								alt="Tutorial Cover Page"
							/>
					}
					<Box sx={{display: 'flex', flexDirection: 'column'}}>
						<CardContent sx={{flex: '1 0 auto'}}>
							{
								loading ?
									<Skeleton variant="rectangular" width={140} height={70}/> :
									<Typography variant="subtitle1" color="text.secondary" component="div">
										{tutorial?.title}
									</Typography>
							}
						</CardContent>
					</Box>
				</CardActionArea>
			</Card>
		</Box>
	)
};
