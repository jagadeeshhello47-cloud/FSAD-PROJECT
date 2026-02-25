import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Alert,
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemText,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import {
	getCurrentRole,
} from '../features/role/roleSlice';
import {
	adminAddContentUpdate,
	adminToggleContentPublish,
	adminToggleUserStatus,
	advisorAddArticle,
	advisorToggleArticlePublish,
	analystAddReport,
	getAdminContentUpdates,
	getAdvisorArticles,
	getAnalystReports,
	getInvestorWatchlist,
	getPlatformActivities,
	getPlatformUsers,
	investorAddToWatchlist,
	investorRemoveFromWatchlist,
	logPlatformActivity,
} from '../features/platform/platformSlice';
import {
	getSelectedFundCode,
	getSelectedFundData,
	getSelectedFundName,
} from '../features/selected/selectedSlice';

const RoleWorkspace = () => {
	const dispatch = useDispatch();
	const role = useSelector(getCurrentRole);
	const users = useSelector(getPlatformUsers);
	const activities = useSelector(getPlatformActivities);
	const contentUpdates = useSelector(getAdminContentUpdates);
	const advisorArticles = useSelector(getAdvisorArticles);
	const watchlist = useSelector(getInvestorWatchlist);
	const reports = useSelector(getAnalystReports);

	const selectedFundName = useSelector(getSelectedFundName);
	const selectedFundCode = useSelector(getSelectedFundCode);
	const selectedFundData = useSelector(getSelectedFundData);

	const [adminTitle, setAdminTitle] = useState('');
	const [adminSummary, setAdminSummary] = useState('');
	const [advisorTitle, setAdvisorTitle] = useState('');
	const [advisorSummary, setAdvisorSummary] = useState('');

	const fundAnalytics = useMemo(() => {
		if (!selectedFundData || selectedFundData.length < 2) {
			return null;
		}

		const latest = Number(selectedFundData[0].nav);
		const oldest = Number(selectedFundData[selectedFundData.length - 1].nav);
		const changePct = oldest === 0 ? 0 : ((latest - oldest) / oldest) * 100;

		const navValues = selectedFundData.map((entry) => Number(entry.nav));
		const averageNav = navValues.reduce((acc, current) => acc + current, 0) / navValues.length;

		return {
			latest,
			oldest,
			changePct,
			averageNav,
			periodStart: selectedFundData[selectedFundData.length - 1].date,
			periodEnd: selectedFundData[0].date,
			observations: selectedFundData.length,
		};
	}, [selectedFundData]);

	const handleAddAdminUpdate = () => {
		if (!adminTitle.trim() || !adminSummary.trim()) return;
		dispatch(adminAddContentUpdate({ title: adminTitle.trim(), summary: adminSummary.trim() }));
		dispatch(logPlatformActivity(`Admin created content update: ${adminTitle.trim()}`));
		setAdminTitle('');
		setAdminSummary('');
	};

	const handleAddAdvisorArticle = () => {
		if (!advisorTitle.trim() || !advisorSummary.trim()) return;
		dispatch(advisorAddArticle({ title: advisorTitle.trim(), summary: advisorSummary.trim() }));
		dispatch(logPlatformActivity(`Advisor added article: ${advisorTitle.trim()}`));
		setAdvisorTitle('');
		setAdvisorSummary('');
	};

	const handleAddSelectedToWatchlist = () => {
		if (!selectedFundCode || !selectedFundName) return;
		dispatch(investorAddToWatchlist({ schemeCode: selectedFundCode, schemeName: selectedFundName }));
		dispatch(logPlatformActivity(`Investor added ${selectedFundName} to watchlist`));
	};

	const handleGenerateReport = () => {
		if (!fundAnalytics || !selectedFundName) return;

		const recommendation =
			fundAnalytics.changePct >= 10
				? 'Positive momentum observed; suitable for moderate-long horizon tracking.'
				: fundAnalytics.changePct <= -10
					? 'Downtrend observed; review risk tolerance before allocation decisions.'
					: 'Relatively stable trend; compare with category peers before finalizing.';

		const summary = `Fund: ${selectedFundName}. Period: ${fundAnalytics.periodStart} to ${fundAnalytics.periodEnd}. NAV change: ${fundAnalytics.changePct.toFixed(2)}%. Average NAV: ${fundAnalytics.averageNav.toFixed(2)}. Insight: ${recommendation}`;

		dispatch(
			analystAddReport({
				title: `Trend report - ${selectedFundName}`,
				summary,
			})
		);
		dispatch(logPlatformActivity(`Analyst generated report for ${selectedFundName}`));
	};

	return (
		<Card sx={{ mt: '10px', mx: '10px', borderRadius: '5px', backgroundColor: 'background.contrast' }}>
			<CardContent>
				<Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'stretch', md: 'center' }} justifyContent="space-between">
					<Typography variant="h6" sx={{ fontWeight: 'bold' }}>Role-Based Platform Workspace</Typography>
					<Chip color="primary" variant="outlined" label={`Current role: ${role}`} />
				</Stack>

				<Divider sx={{ my: 2 }} />

				{role === 'Admin' && (
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<Card variant="outlined">
								<CardContent>
									<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>User and Access Management</Typography>
									<List dense>
										{users.map((user) => (
											<ListItem
												key={user.id}
												secondaryAction={
													<Button size="small" variant="outlined" onClick={() => dispatch(adminToggleUserStatus(user.id))}>
														{user.active ? 'Deactivate' : 'Activate'}
													</Button>
												}
											>
												<ListItemText
													primary={`${user.name} (${user.role})`}
													secondary={`Engagement: ${user.engagement}%`}
												/>
											</ListItem>
										))}
									</List>
								</CardContent>
							</Card>
						</Grid>

						<Grid item xs={12} md={6}>
							<Card variant="outlined">
								<CardContent>
									<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Content Oversight</Typography>
									<Stack spacing={1.2} sx={{ mt: 1.5 }}>
										<TextField label="Update title" value={adminTitle} onChange={(event) => setAdminTitle(event.target.value)} size="small" />
										<TextField label="Update summary" value={adminSummary} onChange={(event) => setAdminSummary(event.target.value)} size="small" multiline minRows={2} />
										<Button variant="contained" onClick={handleAddAdminUpdate}>Add update</Button>
									</Stack>

									<List dense>
										{contentUpdates.map((item) => (
											<ListItem
												key={item.id}
												secondaryAction={
													<Button size="small" variant="text" onClick={() => dispatch(adminToggleContentPublish(item.id))}>
														{item.published ? 'Unpublish' : 'Publish'}
													</Button>
												}
											>
												<ListItemText
													primary={item.title}
													secondary={`${item.summary} • ${item.published ? 'Published' : 'Draft'}`}
												/>
											</ListItem>
										))}
									</List>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				)}

				{role === 'Investor' && (
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<Card variant="outlined">
								<CardContent>
									<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Fund Selection and Comparison Support</Typography>
									{selectedFundName ? (
										<Stack spacing={1} sx={{ mt: 1.5 }}>
											<Chip label={`Selected fund: ${selectedFundName}`} variant="outlined" />
											{fundAnalytics && (
												<>
													<Typography variant="body2">Period NAV change: {fundAnalytics.changePct.toFixed(2)}%</Typography>
													<Typography variant="body2">Average NAV: {fundAnalytics.averageNav.toFixed(2)}</Typography>
													<Typography variant="body2">Observations: {fundAnalytics.observations}</Typography>
												</>
											)}
											<Button variant="contained" onClick={handleAddSelectedToWatchlist}>Add selected fund to watchlist</Button>
										</Stack>
									) : (
										<Alert severity="info" sx={{ mt: 1.5 }}>Select a fund from search to unlock analytics and watchlist actions.</Alert>
									)}
								</CardContent>
							</Card>
						</Grid>

						<Grid item xs={12} md={6}>
							<Card variant="outlined">
								<CardContent>
									<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Watchlist Management</Typography>
									{watchlist.length === 0 ? (
										<Typography variant="body2" sx={{ mt: 1.5 }}>No funds in watchlist yet.</Typography>
									) : (
										<List dense>
											{watchlist.map((item) => (
												<ListItem
													key={item.schemeCode}
													secondaryAction={
														<Button size="small" onClick={() => dispatch(investorRemoveFromWatchlist(item.schemeCode))}>
															Remove
														</Button>
													}
												>
													<ListItemText primary={item.schemeName} secondary={`Code: ${item.schemeCode}`} />
												</ListItem>
											))}
										</List>
									)}
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				)}

				{role === 'Financial Advisor' && (
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<Card variant="outlined">
								<CardContent>
									<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Create Educational Content</Typography>
									<Stack spacing={1.2} sx={{ mt: 1.5 }}>
										<TextField label="Article title" value={advisorTitle} onChange={(event) => setAdvisorTitle(event.target.value)} size="small" />
										<TextField label="Article summary" value={advisorSummary} onChange={(event) => setAdvisorSummary(event.target.value)} size="small" multiline minRows={2} />
										<Button variant="contained" onClick={handleAddAdvisorArticle}>Create article</Button>
									</Stack>
								</CardContent>
							</Card>
						</Grid>

						<Grid item xs={12} md={6}>
							<Card variant="outlined">
								<CardContent>
									<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Advisor Guidance Library</Typography>
									<List dense>
										{advisorArticles.map((article) => (
											<ListItem
												key={article.id}
												secondaryAction={
													<Button size="small" onClick={() => dispatch(advisorToggleArticlePublish(article.id))}>
														{article.published ? 'Set Draft' : 'Publish'}
													</Button>
												}
											>
												<ListItemText
													primary={article.title}
													secondary={`${article.summary} • ${article.published ? 'Published' : 'Draft'}`}
												/>
											</ListItem>
										))}
									</List>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				)}

				{role === 'Data Analyst' && (
					<Grid container spacing={2}>
						<Grid item xs={12} md={5}>
							<Card variant="outlined">
								<CardContent>
									<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Trend and Performance Analytics</Typography>
									{fundAnalytics && selectedFundName ? (
										<Stack spacing={1.1} sx={{ mt: 1.5 }}>
											<Typography variant="body2">Current focus fund: {selectedFundName}</Typography>
											<Typography variant="body2">Latest NAV: {fundAnalytics.latest.toFixed(2)}</Typography>
											<Typography variant="body2">Oldest NAV: {fundAnalytics.oldest.toFixed(2)}</Typography>
											<Typography variant="body2">Change across period: {fundAnalytics.changePct.toFixed(2)}%</Typography>
											<Button variant="contained" onClick={handleGenerateReport}>Generate report from selected fund</Button>
										</Stack>
									) : (
										<Alert severity="info" sx={{ mt: 1.5 }}>
											Choose a fund in search to generate analyst reports from live data.
										</Alert>
									)}
								</CardContent>
							</Card>
						</Grid>

						<Grid item xs={12} md={7}>
							<Card variant="outlined">
								<CardContent>
									<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Generated Analyst Reports</Typography>
									{reports.length === 0 ? (
										<Typography variant="body2" sx={{ mt: 1.5 }}>No reports generated yet.</Typography>
									) : (
										<List dense>
											{reports.map((report) => (
												<ListItem key={report.id}>
													<ListItemText primary={report.title} secondary={report.summary} />
												</ListItem>
											))}
										</List>
									)}
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				)}

				<Divider sx={{ my: 2 }} />

				<Box>
					<Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Recent Platform Activities</Typography>
					{activities.length === 0 ? (
						<Typography variant="body2">No activity yet.</Typography>
					) : (
						<List dense>
							{activities.slice(0, 6).map((activity) => (
								<ListItem key={activity.id}>
									<ListItemText
										primary={activity.message}
										secondary={new Date(activity.createdAt).toLocaleString()}
									/>
								</ListItem>
							))}
						</List>
					)}
				</Box>
			</CardContent>
		</Card>
	);
};

export default RoleWorkspace;
