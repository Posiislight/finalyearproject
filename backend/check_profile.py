from users.models import User, Skill, Experience

seekers = User.objects.filter(is_job_seeker=True)
print(f"Total job seekers: {seekers.count()}")
for u in seekers:
    profile = getattr(u, "job_seeker_profile", None)
    bio = profile.bio if profile else "NO PROFILE"
    loc = profile.location if profile else "N/A"
    skills = list(Skill.objects.filter(user=u).values_list("name", flat=True))
    exps = list(Experience.objects.filter(user=u).values_list("role", flat=True))
    print(f"  User {u.id} ({u.username}): {u.first_name} {u.last_name}")
    print(f"    Bio: {bio} | Location: {loc}")
    print(f"    Skills: {skills}")
    print(f"    Experience: {exps}")

print()
all_users = User.objects.all()
print(f"Total users: {all_users.count()}")
for u in all_users:
    print(f"  {u.id}: {u.username} seeker={u.is_job_seeker} employer={u.is_employer}")
