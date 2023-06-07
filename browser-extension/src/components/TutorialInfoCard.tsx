import {Tutorial} from "../client/generated";
import {Box, Chip, Divider, Icon, Stack, Typography} from "@mui/material";
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ShareIcon from '@mui/icons-material/Share';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

export interface TutorialCardProps {
	tutorial: Tutorial,
	onUpVote: () => void,
	onDownVote: () => void,
	onSave: () => void,
}

export const TutorialInfoCard = (props: TutorialCardProps) => {
	const {tutorial, onUpVote, onDownVote, onSave} = props;
	const title = tutorial.title;
	const playCount = 1000;
	const commentCount = 2;
	const datePublished = new Date();
	const description = tutorial.description;
	const voteCount = 999;
	const voted = false;
	const liked = false;
	const upVoted = voted && liked;
	const downVoted = voted && !liked;
	const stared = false;

	return (
		<Box>
			<Typography variant={"h6"}>{title}</Typography>
			<Stack direction={"row"} spacing={1}>
				<Chip icon={<SmartDisplayOutlinedIcon/>} label={playCount} size={"small"} variant={"outlined"}/>
				<Chip icon={<CommentOutlinedIcon/>} label={commentCount} size={"small"} variant={"outlined"}/>
				{datePublished.toDateString()}
			</Stack>
			<Typography variant={"body2"}>{description}</Typography>
			<Stack direction={"row"} spacing={1}>
				<Chip icon={upVoted ? <ThumbUpAltIcon/> : <ThumbUpAltOutlinedIcon/>} label={voteCount} onClick={onUpVote}/>
				<Chip icon={downVoted ? <ThumbDownAltIcon/> : <ThumbDownAltOutlinedIcon/>} onClick={onDownVote}/>
				<Chip icon={<ShareIcon/>} onClick={onDownVote}/>
				<Chip icon={stared ? <StarOutlinedIcon/> : <StarOutlineIcon/>} onClick={onSave}/>
			</Stack>
		</Box>
	)
}
