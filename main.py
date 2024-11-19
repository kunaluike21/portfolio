def process_data(n, nums, x, y):
    for _ in range(n):
        x_val, y_val = nums[_]
        if x_val not in [3, 5]:
            x.append(x_val)
            y.append(y_val)

    for x_val in sorted(x):
        print(x_val)

def main():
    n = int(input())
    nums = []
    x = []
    y = []

    for _ in range(n):
        x_val, y_val = map(int, input().split())
        nums.append((x_val, y_val))

    k = int(input())

    process_data(n, nums, x, y)

if __name__ == "__main__":  # Corrected "__name__" to "__name__"
    main()
