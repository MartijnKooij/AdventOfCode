def compute_area(polygon):
    area = 0.0
    n = len(polygon)
    for i in range(n):
        j = (i + 1) % n
        area += polygon[i][0] * polygon[j][1]
        area -= polygon[j][0] * polygon[i][1]
    area = abs(area) / 2.0
    return area

polygon = [
[ 461937, 0 ],
  [ 461937, -56407 ],
  [ 818608, -56407 ],
  [ 818608, -919647 ],
  [ 1186328, -919647 ],
  [ 1186328, -1186328 ],
  [ 609066, -1186328 ],
  [ 609066, -356353 ],
  [ 497056, -356353 ],
  [ 497056, -1186328 ],
  [ 5411, -1186328 ],
  [ 5411, -500254 ],
  [ 0, -500254 ],
  [ 0, 0 ]]

print(compute_area(polygon))
